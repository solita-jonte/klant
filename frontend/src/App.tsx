import { useState } from 'react'
import { DirectoryHeader } from './components/DirectoryHeader'
import { DirectoryListing } from './components/DirectoryListing'
import { FileViewer } from './components/FileViewer'
import { KlantHeader } from './components/KlantHeader'

function App() {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [directory, setDirectory] = useState<string>("")

  function setDirectoryIfDifferent(dir: string) {
    if (dir != directory) {
      setDirectory(dir);
    }
  }

  return (
    <>
      <KlantHeader />
      <DirectoryHeader directory={directory} onSelectDirectory={setDirectoryIfDifferent}/>
      <div className="split">
        <DirectoryListing directory={directory} onSelectDirectory={setDirectoryIfDifferent} onSelectFilePath={setFilePath} />
        <FileViewer filePath={filePath} />
      </div>
    </>
  )
}

export default App
