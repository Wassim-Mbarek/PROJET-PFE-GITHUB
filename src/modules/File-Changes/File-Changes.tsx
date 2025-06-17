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
import { currentCommitMessage } from '../Pull-Requests/Commits'
import { Modal } from 'antd'
import StreamComponent from './components/StreamComponent/StreamComponent'

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
console.log('BOOT_API_KEY',import.meta.env.VITE_BOOT_API_KEY);

  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

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
      } as any)
    : ''

  function extractRawCode(diff: any): string {
    if (!diff?.blocks) return ''

    return diff.blocks
      .flatMap((block: any) =>
        block.lines
          .filter((line: any) => line.type === 'insert' || line.type === 'context')
          .map((line: any) => line.content.replace(/^[-+]/, ''))
      )
      .join('\n')
  }

  const rawCode = selectedDiff ? extractRawCode(selectedDiff) : ''

  return (
    <MainContainer
      linkProps={{
        title: currentCommitMessage || 'File Changes',
        links: [
          { href: PATH.REPOSITORIES, name: 'Repositories' },
          {
            href: PATH.PULL_REQUESTS.replace(':userName', userName!).replace(
              ':repoName',
              repoName!
            ),
            name: 'Pull Requests',
          },
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
                onClick={() => {
                  setSelectedFile(file.name)
                }}
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
          <Modal
            title="Code Review"
            className="editor__modal"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <StreamComponent content={rawCode} />
          </Modal>
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
                <ReviewButton title="Review Changes" onClick={() => setIsModalVisible(true)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default FileChanges
