import { useState } from 'react'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import LoadingScreen from '../shared/components/Loading'
import { PATH } from '../shared/routes/paths'
import { getOneCommit } from '../Pull-Requests/services/Pull-Requests.service'
import 'diff2html/bundles/css/diff2html.min.css'
import * as Diff2Html from 'diff2html'
import './_File-Changes.scss'
import ReviewButton from '../shared/components/Buttons/Review'
import FolderEmpty from '../shared/components/FolderEmpty'

const formatTwoDigits = (num: number) => num.toString().padStart(2, '0')

const FileChanges: React.FC = () => {
  const { userName, repoName, sha } = useParams<{
    userName: string
    repoName: string
    sha: string
  }>()

  const { data: commit, isLoading } = useQuery(
    ['commit', userName, repoName, sha],
    () => getOneCommit(userName!, repoName!, sha!),
    {
      enabled: !!userName && !!repoName && !!sha,
    }
  )

  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  if (isLoading) return <LoadingScreen />

  const diffJson = Diff2Html.parse(commit)

  const files = diffJson.map((file) => ({
    name: file.newName || file.oldName,
    added: formatTwoDigits(file.addedLines ?? 0),
    deleted: formatTwoDigits(file.deletedLines ?? 0),
  }))

  const selectedDiff = diffJson.find((file) => (file.newName || file.oldName) === selectedFile)

  const fileHtml = selectedDiff
    ? Diff2Html.html([selectedDiff], {
        inputFormat: 'json',
        outputFormat: 'side-by-side',
        highlight: true,
        drawFileList: false,
        colorScheme: 'dark',
      })
    : ''

  return (
    <MainContainer
      linkProps={{
        title: 'File Changes',
        links: [
          { href: PATH.REPOSITORIES, name: 'Repositories' },
          { href: '', name: 'Pull Requests' },
          { href: '', name: 'Commit' },
        ],
      }}
    >
      <div className="file-changes-container">
        <div className="files-list">
          <div className="files-list__title"> Files: </div>
          <ul className="scorll-list">
            {files.map((file, index) => (
              <li
                key={index}
                className={`files-list__data-container${
                  selectedFile === file.name ? '' : 'active'
                }`}
                onClick={() => setSelectedFile(file.name)}
              >
                <div className="files-list__data-container">
                  <div className="files-list__data-container__name">{file.name}</div>
                  <div className="files-list__data-container__action-number deleted">
                    {' '}
                    {file.deleted}{' '}
                  </div>
                  <div className="files-list__data-container__action-number added">
                    {' '}
                    {file.added}{' '}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="file-changes__details">
          <div className="file-changes__details__title"> File Content: </div>
          <div className="file-changes__details__content">
            {selectedFile ? (
              <div className="code-diff__wrapper">
                <div className="code-diff" dangerouslySetInnerHTML={{ __html: fileHtml }} />
              </div>
            ) : (
              <FolderEmpty title="No File Selected" />
            )}

            {selectedFile && (
              <div className="file-changes__details__content__review-button">
                <ReviewButton
                  title="Review Changes"
                  onClick={() => {
                    console.log(`Reviewing file: ${selectedFile}`)
                    // handle review logic here
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default FileChanges
