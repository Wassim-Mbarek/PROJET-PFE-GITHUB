import HilightCode from '../Hilights'

interface IFile {
  file: {
    content: string
    name: string
    path: string
  }
  readyToUse?: string
}
export default function Editor({ file, readyToUse }: IFile) {
  return (
    <div className="editor">
      <HilightCode file={file} addLinesNumbers readyToUse={readyToUse} />
    </div>
  )
}
