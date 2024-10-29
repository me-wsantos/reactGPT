import OpenAI from "openai";
import { extractJsonMarkdown } from "src/utils/extractJsonMarkdown";

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async(openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system",
        content: `
          Você é um professor de língua portuguesa muito experiente e domina com maestria as regras gramaticais desse idioma.
          Você receberá textos em português do Brasil com possíveis erros ortográficos e gramaticais.
          Sua tarefa é corrigir os erros e retornar sugestões de soluções,
          também você deve retornar uma porcentagem de acertos para o usuário.
          Se não houver erros, retorne uma mensagem parabenizando o usuário.
          Se a porcentagem de erro estiver abaixo de 50%, retorne uma mensagem alertando o usuário pelo alto índice de erro.
          Se a porcentagem de erro estiver entre de 51% e 80%, retorne uma mensagem dizendo ao usuário que pode melhorar.
          Retorne o resultado em formato JSON.

          Exemplo de saída:
          {
            userScore: number,
            errors: string[], // ['error -> solução']
            message: string, // use emojis e textos para parabenizar o usuário
          }
        `
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "gpt-4o",
    temperature: 0.3,
    max_tokens: 150,
  });

  
  const response = completion.choices[0].message.content;

  const jsonText = extractJsonMarkdown(response)
  
  return JSON.parse(jsonText);
}