import { pipeline } from "@xenova/transformers";
import { MessageTypes } from "./presets";
import { env } from "@xenova/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

class MyTranscriptionPipeline {
  static instance = null;

  static async getInstance() {
    if (!this.instance) {
      this.instance = await pipeline("automatic-speech-recognition");
    }

    return this.instance;
  }
}

self.addEventListener("message", async ({ data: { type, audio } }) => {
  if (type === MessageTypes.INFERENCE_REQUEST) {
    await transcribeAudio(audio);
  }
});

async function transcribeAudio(audio) {
  postMessage({ type: MessageTypes.DOWNLOADING });

  let transcriptionPipeline;
  transcriptionPipeline = await MyTranscriptionPipeline.getInstance();

  const stride_length_s = 5;
  const generationTracker = new GenerationTracker(
    transcriptionPipeline,
    stride_length_s
  );

  postMessage({ type: MessageTypes.LOADING });

  await transcriptionPipeline(audio, {
    top_k: 0,
    do_sample: false,
    chunk_length: 30,
    stride_length_s,
    return_timestamps: true,
    chunk_callback: generationTracker.chunkCallback.bind(generationTracker),
  });

  postMessage({ type: MessageTypes.INFERENCE_DONE });
}

class GenerationTracker {
  constructor(transcriptionPipeline, stride_length_s) {
    this.transcriptionPipeline = transcriptionPipeline;
    this.stride_length_s = stride_length_s;
    this.chunks = [];
    this.time_precision =
      transcriptionPipeline?.processor.feature_extractor.config.chunk_length /
      transcriptionPipeline.model.config.max_source_positions;
    this.processed_chunks = [];
  }

  chunkCallback(data) {
    this.chunks.push(data);
    const [text, { chunks }] = this.transcriptionPipeline.tokenizer._decode_asr(
      this.chunks,
      {
        time_precision: this.time_precision,
        return_timestamps: true,
        force_full_sequence: false,
      }
    );

    this.processed_chunks = chunks.map((chunk, index) => {
      return this.processChunk(chunk, index);
    });

    postMessage({
      type: MessageTypes.RESULT,
      results: this.processed_chunks,
    });
  }

  processChunk(chunk, index) {
    const { text, timestamp } = chunk;
    const [start, end] = timestamp;

    return {
      index,
      text: `${text.trim()}`,
      start: Math.round(start),
      end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s),
    };
  }
}
