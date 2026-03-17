import React, {useState} from "react";
import {fetchFile} from "./fetchFile"

export interface FileViewerProps {
  filePath: string | null,
}

interface FetchElement {
  filePath: string,
  element: React.ReactElement,
}

export const FileViewer: React.FC<FileViewerProps> = ({
  filePath,
}) => {
  const [fileElement, setFileElement] = useState<FetchElement>({filePath: "", element: (<p/>)})

  if (filePath && filePath != fileElement.filePath) {
    fileElement.filePath = filePath;
    fetchFile(filePath, (res) => {
      if (res.type == "image") {
        setFileElement({filePath: filePath, element: (<img src={res.content}></img>)})
      } else {
        setFileElement({filePath: filePath, element: (<pre>{res.content}</pre>)})
      }
    });

  }

  return (
    <div className="fileview">
      {fileElement.element}
    </div>
  )
}
