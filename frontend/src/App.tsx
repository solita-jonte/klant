import { useState } from 'react'
import { DirectoryHeader } from './DirectoryHeader'
import { DirectoryListing } from './DirectoryListing'
import { FileViewer } from './FileViewer'
import { KlantHeader } from './KlantHeader'

function App() {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [directory, setDirectory] = useState<string>("")

  function setDirectoryIfDifferent(dir: string) {
    if (dir != directory) {
      console.log(`${dir} different from ${directory}`)
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
