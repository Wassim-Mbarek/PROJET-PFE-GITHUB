import { useState, useEffect } from 'react'

export default function FileExtensionIcon({
  file,
  className,
}: {
  file: string
  className: string
}) {
  const [iconPath, setIconPath] = useState('')

  useEffect(() => {
    const importFile = async () => {
      try {
        const { default: icon } = await import(`../../../assets/extensions/ic-${file}.svg`)
        setIconPath(icon)
      } catch (error) {
        console.error('Error importing file icon:', error)
      }
    }

    importFile()
  }, [file])

  return <img src={iconPath} className={className} alt={`Icon for ${file}`} />
}
