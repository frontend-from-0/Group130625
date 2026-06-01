import { createOpenAI } from '@ai-sdk/openai';

export function getOpenAIModel() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const openai = createOpenAI({ apiKey });
  return openai('gpt-4o-mini');
}

export function assertApiKeyConfigured(): void {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
}
