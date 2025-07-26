import { pipeline } from '@xenova/transformers'

let generator: any

export async function loadModel() {
  if (!generator) {
    generator = await pipeline('text-generation', 'Xenova/distilgpt2')
  }
}

export async function generateTokens(prompt: string): Promise<string[]> {
  if (!generator) {
    await loadModel()
  }

  const output = await generator(prompt, {
    max_new_tokens: 200,
    do_sample: true,
    temperature: 0.7,
    top_k: 50,
    top_p: 0.95
  })

  // Assuming the output is an array of strings or can be parsed as such
  // You might need to adjust this based on the actual model output format
  return output[0].generated_text.split(/\s*,\s*/).filter(Boolean)
}
