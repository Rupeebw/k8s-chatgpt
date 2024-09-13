import OpenAI from 'openai';
import { environment } from '../environments/environment';

const openai = new OpenAI({
  apiKey: environment.openaiApiKey,
  dangerouslyAllowBrowser: true // Note: This is still not recommended for production
});

export async function getChatGPTResponse(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return 'Sorry, there was an error generating a response.';
  }
}
