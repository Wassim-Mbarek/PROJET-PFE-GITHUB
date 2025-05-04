import folderEmpty from '../../assets/images/folder_empty.png'
export default function FolderEmpty({ title = 'no data found' }: { title: string }) {
  return (
    <div className="folder-empty">
      <img className="folder-empty__image" src={folderEmpty} alt="folder empty" />
      <p className="folder-empty__title">{title}</p>
    </div>
  )
}
