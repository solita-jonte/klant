import React from "react";

export interface FileViewerProps {
    filePath: string | null,
}

export const FileViewer: React.FC<FileViewerProps> = ({
    filePath,
}) => {
    return (
        <div>
            <p>Smt goes here: {filePath}</p>
        </div>
    )
}
