import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader, GptOrthographyMessage } from "../../components"
import { orthograpyUseCase } from "../../../core/use-cases/orthography.use-case"

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text, isGpt: false }])

    const { ok, errors, message, userScore } = await orthograpyUseCase(text)
    
    console.log("resposta", {ok, errors, message, userScore})

    if (!ok) {
      setMessages((prev) => [...prev, { text: "Não foi possível realizar a correção!", isGpt: true }])
    } else {
      setMessages((prev) => [...prev, { 
        text: message,
        isGpt: true,
        info: {
          userScore,
          errors,
          message
        }
      }])
    }

    setIsLoading(false)

    //TODO: Alterar isGpt = false
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="flex flex-col">
          <GptMessage text="Oi, escreva o seu texto em português, e posso lhe ajudar com as correções." />

          {
            messages.map((message, index) => (
              message.isGpt
                ? (<GptOrthographyMessage 
                    key={index}
                    userScore={ message.info!.userScore}
                    errors={ message.info!.errors}
                    message={ message.info!.message}
                  />)
                : (<MyMessage key={index} text={message.text} />)
            ))
          }

          {
            isLoading && (
              <TypingLoader className="fade-in" />
            )
          }

        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escreva aqui sua mensagem"
        disableCorrections
      />
    </div>
  )
}
