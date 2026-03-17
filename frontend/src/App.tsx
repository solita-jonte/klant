import { useState } from 'react'
import { DirectoryHeader } from './components/DirectoryHeader'
import { DirectoryListing } from './components/DirectoryListing'
import { ErrorMessage } from './components/ErrorMessage'
import { FileViewer } from './components/FileViewer'
import { KlantHeader } from './components/KlantHeader'

function App() {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [directory, setDirectory] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")

  function setDirectoryIfDifferent(dir: string) {
    if (dir !== directory) {
      setDirectory(dir);
    }
  }

  return (
    <>
      <KlantHeader />
      <DirectoryHeader directory={directory} onSelectDirectory={setDirectoryIfDifferent}/>
      <ErrorMessage error={errorMsg} />
      <div className="split">
        <DirectoryListing directory={directory} onSelectDirectory={setDirectoryIfDifferent} onSelectFilePath={setFilePath} onError={setErrorMsg} />
        <FileViewer filePath={filePath} onError={setErrorMsg} />
      </div>
    </>
  )
}

export default App
