import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'react-lottie'
//@ts-ignore
import githubLottieAnimation from '../../assets/animations/loader.json'
import { styleSmall, styleMoyenne, styleFull } from './styles'

export default function LoadingScreen({
  size,
  blur,
}: {
  size?: 's' | 'm' | 'full'
  blur?: boolean
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: githubLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const style = size === 's' ? styleSmall : size === 'm' ? styleMoyenne : styleFull

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`loader-github ${blur ? 'loader-github--blur' : ''}`}
        style={style.background}
      >
        <Lottie options={defaultOptions} height={250} width={250} style={style.lottie} />
      </motion.div>
    </AnimatePresence>
  )
}
