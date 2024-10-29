import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"

interface Message {
  text: string
  isGpt: boolean
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text, isGpt: false }])

    //TODO: UseCase

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
                ? (<GptMessage key={index} text="Mensagem de OpenAI" />)
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
