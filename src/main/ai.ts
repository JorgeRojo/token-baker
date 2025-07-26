import { pipeline, TextGenerationPipeline } from '@xenova/transformers'

let generator: TextGenerationPipeline | undefined

export async function loadModel(): Promise<void> {
  if (!generator) {
    generator = await pipeline('text-generation', 'Xenova/phi-3-mini-4k-instruct');
  }
}

export async function generateTokens(prompt: string): Promise<string[]> {
  if (!generator) {
    await loadModel()
    return []
  }

  const output = await generator(prompt, {
    max_new_tokens: 200,
    do_sample: true,
    temperature: 0.7,
    top_k: 50,
    top_p: 0.95
  })

  return (output[0] as any).generated_text.split(/\s*,\s*/).filter(Boolean)
}
