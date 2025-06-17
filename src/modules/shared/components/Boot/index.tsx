import { BootApiKey, BootApiRoute } from '../../api/context'
import { useEffect, useState } from 'react'

export default function UseBootStream(prompt: string) {
  const [lines, setLines] = useState<string>('')
  const [codeLines, setCodeLines] = useState('')
  const [textLines, setTextLines] = useState('')
  const [language, setLanguage] = useState('')
  const message = ` ${prompt} `
  const messageIndex = '```'
  useEffect(() => {
    async function startChat() {
      const messages = [
        {
          role: 'system',
          content:
            'You are ChatGPT, a language model trained to provide code review and feedback. Your task is to process the provided code snippet, identify the issues, and add descriptions to explain each one. Additionally, suggest how to solve each issue.return all codes in one block , always  start with code block and return a text obligatory and do not include text inside code block , specify if the code is a jsx / tsx or ts / js',
        },
        {
          role: 'user',
          content: message,
        },
      ]
      try {
        const response = await fetch(BootApiRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BootApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            stream: true,
            stop: ['\n\n\n\n'],
          }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const reader = response?.body?.getReader()
        let jsonBuffer = ''
        while (true) {
          const { done, value } = (await reader?.read()) || {}
          if (done) {
            break
          }
          const chunk = new TextDecoder().decode(value)
          jsonBuffer += chunk

          const jsonObjects = jsonBuffer.split('data:')
          jsonBuffer = jsonObjects.pop() as string
          jsonObjects.forEach((jsonObject) => {
            try {
              const jsonData = JSON.parse(jsonObject)
              if (jsonData && jsonData.choices && jsonData.choices.length > 0) {
                const content = jsonData.choices[0].delta.content || ''
                setLines((prev: string) => prev + content!)
              }
            } catch (error) {
              console.error('Error parsing JSON:', error)
            }
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    startChat()
    return () => {}
  }, [])

  useEffect(() => {
    const processLines = (lines: string) => {
      const linesCodeStart = lines.indexOf(messageIndex)
      const linesCodeEnd = lines.lastIndexOf(messageIndex)

      if (linesCodeStart !== -1 && linesCodeStart === linesCodeEnd) {
        const codeBlock = lines.slice(linesCodeStart + 3)
        const languageEndIndex = codeBlock.indexOf('\n')
        if (languageEndIndex !== -1) {
          const language = codeBlock.slice(0, languageEndIndex)
          setLanguage(language)
          setCodeLines(codeBlock.slice(languageEndIndex + 1))
        }
      } else if (linesCodeStart !== -1 && linesCodeStart !== linesCodeEnd) {
        const codeBlock = lines.slice(linesCodeStart + 3, linesCodeEnd)
        const textBlock = lines.slice(linesCodeEnd + 3)
        const languageEndIndex = codeBlock.indexOf('\n')
        if (languageEndIndex !== -1) {
          const language = codeBlock.slice(0, languageEndIndex)
          setLanguage(language)
          setCodeLines(codeBlock.slice(languageEndIndex + 1))
          setTextLines(textBlock)
        }
      }
    }
    processLines(lines)
  }, [lines])
  return { codeLines, textLines, language, lines }
}
