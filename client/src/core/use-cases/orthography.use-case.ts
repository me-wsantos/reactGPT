import { OrthographyResponse } from "../../interfaces"

export const orthograpyUseCase = async(prompt: string) => {

  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if(!resp.ok) throw new Error('Não foi possível realizar a correção!!!')
    
    const data = await resp.json() as OrthographyResponse
    console.log("data", data)

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Não foi possível realizar a correção'
    }
  }
}