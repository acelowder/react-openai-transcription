import { pipeline } from "@xenova/transformers";
import { env } from "@xenova/transformers";
import { MessageTypes } from "./presets";

env.allowLocalModels = false;
env.useBrowserCache = false;

class TranslationPipeline {
  static task = "translation";
  static model = "Xenova/nllb-200-distilled-600M";
  static instance = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model);
    }

    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  let translator;
  translator = await TranslationPipeline.getInstance();

  let output = await translator(event.data.text, {
    tgt_lang: event.data.target_language,
    src_lang: event.data.source_language,
  });

  self.postMessage({
    type: MessageTypes.RESULT,
    translation: output,
  });
});
