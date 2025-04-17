import { ReactComponent as StarsIcon } from '../../../assets/icons/svgs/stars.svg'
export default function ReviewButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button className="button-ai" onClick={onClick}>
      <StarsIcon className="button-ai__img" />
      {title!}
    </button>
  )
}
