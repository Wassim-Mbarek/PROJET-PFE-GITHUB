import '../_StreamComponent.scss'
import chatAvatar from '../../../shared/assets/images/chat_avatar.png'
import Editor from '@src/modules/shared/components/Editor'
import UseBootStream from '@src/modules/shared/components/Boot'

const StreamComponent: React.FC<{ content: string }> = ({ content }) => {
  const { codeLines, textLines, language, lines } = UseBootStream(content)

  const fileSelected = {
    content: '',
    name: language || 'tsx',
    path: '',
  }

  return (
    <div className="stream-component">
      <div className="editor-container">
        <div className="editor-header">
          <img className="chat-avatar" src={chatAvatar}></img>
          <span className="chat-name"> Llama-2 ai assistant </span>
        </div>
        <Editor file={fileSelected} readyToUse={content} />
        <div className="review-text">{textLines}</div>
      </div>
    </div>
  )
}

export default StreamComponent
