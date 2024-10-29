import OpenAI from "openai";

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

  console.log(completion);
  return completion.choices[0];
}