import { Highlight, themes } from 'prism-react-renderer'
import { useEffect, useState } from 'react'
import FileExtensionIcon from './FileExtensionIcon'

export default function HilightCode({
  file,
  readyToUse,
  language,
  addLinesNumbers,
}: any) {
  const [newFile, setNewFile] = useState<{ content: string } | null>(null)
  useEffect(() => setNewFile(file), [file])
  function getFileExtension(filename: string) {
    const lastIndexOfDot = filename?.lastIndexOf('.')
    const fileName = filename?.slice(lastIndexOfDot + 1)
    const inCludeLock =
      filename?.includes('package.json') || filename?.includes('package-lock.json')
    return {
      type: fileName === 'scss' || fileName === 'sass' ? 'css' : fileName,
      extension: inCludeLock ? 'lock' : fileName,
    }
  }
  const getFilePath = (file: string) => {
    const pathFirstIndex = file?.indexOf('/')
    const pathLastIndex = file?.lastIndexOf('/')
    return `...${file?.slice(pathFirstIndex, pathLastIndex)}`
  }
  return (
    <Highlight
      theme={themes.oneDark}
      code={readyToUse ? readyToUse : newFile?.content ? atob(newFile?.content) : ''}
      language={language ? language : file ? getFileExtension(file?.name).type : ''}
    >
      {({ style, tokens, getLineProps, getTokenProps }: any) => {
        return (
          <pre style={style}>
            <div className="pre-editor_header">
              <div className="pre-editor_header_icons">
                <span className="pre-editor_header_icons-icon red"></span>
                <span className="pre-editor_header_icons-icon yellow"></span>
                <span className="pre-editor_header_icons-icon green"></span>
              </div>
              {(language || file) && (
                <div className="pre-editor_header_file-name">
                  <FileExtensionIcon
                    className="pre-editor_header_file-icon"
                    file={
                      language ? language : file ? getFileExtension(file?.name).extension : null
                    }
                  />

                  <p className="pre-editor_header_file-name_text">{language || file?.name}</p>
                  {file ? (
                    <p className="pre-editor_header_file-name_text">{getFilePath(file?.path)}</p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="pre-editor_body">
              {tokens.map((line: any[], i: number) => (
                <div key={i} {...getLineProps({ line })}>
                  {addLinesNumbers && <span className="line-number">{i + 1} </span>}
                  {line.map((token: any, key: React.Key | null | undefined) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </div>
          </pre>
        )
      }}
    </Highlight>
  )
}
