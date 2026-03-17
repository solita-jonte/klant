export interface DirectoryHeaderProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
}

export const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  directory,
  onSelectDirectory,
}) => {
  return (
    <div className="directory-header">
      <h2>{directory}</h2>
    </div>
  );
}
