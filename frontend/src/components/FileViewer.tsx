import {useEffect, useState} from "react";
import {fetchFile, type FileData} from "../utils/fetch-file"

export interface FileViewerProps {
  filePath: string | null,
  onError?: (error: string) => void,
}

export function FileViewer({
  filePath,
  onError,
}:FileViewerProps) {
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileData, setFileData] = useState<FileData | null>(null)

  useEffect(() => {
    if (filePath) {
      const guardRun = async () => {
        setLoadingFile(true);
        fetchFile(filePath, (fd) => {
          onError?.("");
          setFileData(fd);
          setLoadingFile(false);
        }, (err) => {
          onError?.(err);
          setLoadingFile(false);
        });
      }
      guardRun();
    }
  }, [filePath]);

  let content = (<pre>[Click on file to view]</pre>);
  if (fileData) {
      if (fileData.type === "image") {
        content = (<img src={fileData.content}></img>);
      } else {
        content = (<pre>{fileData.content}</pre>);
      }
  }

  return (
    <div className="fileview">
      {loadingFile
      ? <p className="loading">Loading...</p>
      : content}
    </div>
  )
}
