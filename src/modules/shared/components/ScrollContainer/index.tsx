import { ReactElement } from 'react'

export default function ScrollContainer({ children }: { children: ReactElement | ReactElement[] }) {
  return <div className="scroll-container">{children}</div>
}
