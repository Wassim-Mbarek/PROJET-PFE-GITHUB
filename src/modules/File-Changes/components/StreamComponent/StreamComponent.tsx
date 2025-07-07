import UseBootStream from '@src/modules/shared/components/Boot'
import '../_StreamComponent.scss'
import llamaAvatar from '@src/modules/shared/assets/images/chat_avatar.png'
import HilightCode from '@src/modules/shared/components/Hilights'
import typingAnimation from '@src/modules/shared/assets/animations/typing.json'
import Lottie from 'react-lottie'
const StreamComponent: React.FC<{ content: string }> = ({ content }) => {
  const { codeLines, textLines, language, lines } = UseBootStream(content)


  console.log({codeLines  , textLines, language, lines})
  return (
     <div className="stream-wrapper">
      <div className="editor">
        <div className="stream-wrapper__text">
          <div className="stream-wrapper__text__user">
            <img src={llamaAvatar} className="stream-wrapper__text__avatar" />
            <p className="stream-wrapper__text__name">Open ai assistant</p>
          </div>
          {codeLines && (
            <HilightCode readyToUse={codeLines} language={language! || 'jsx'} addLinesNumbers />
          )}
          <p className="stream-wrapper__text__content">{textLines}</p>
          {!lines && (
            <Lottie options={defaultOptions} height={25} width={50} style={{ margin: 0 }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default StreamComponent

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
