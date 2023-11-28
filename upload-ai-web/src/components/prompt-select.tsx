import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface IPrompt {
  id: string,
  title: string,
  template: string
}

interface IPromptSelectProps {
  onPromptSelected: (template: string) => void
}

export const PromptSelect = (props: IPromptSelectProps) => {
  const [prompts, setPrompts] = useState<IPrompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(res => {
      setPrompts(res.data)
    })
  }, [])

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}