import Markdown from "react-markdown"

interface Props{
  text: string
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col col-start-6 col-end-3 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          W
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <Markdown>{ text }</Markdown>
        </div>
      </div>
    </div>
  )
}
