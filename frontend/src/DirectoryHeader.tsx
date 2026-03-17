export interface DirectoryHeaderProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
}

export const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  directory,
  onSelectDirectory,
}) => {
  console.log("This is what we've got: " + directory);
  let parentDir = "";
  const directories = directory
    .split("/")
    .filter((fragment, index) => index==0 || fragment)
    .map((fragment) => {
      if (!parentDir.endsWith("/")) {
        parentDir += "/";
      }
      parentDir += fragment;
      console.log("Header mapping fragment: " + fragment + ", parentDir=" + parentDir);
      return {
        text: fragment + "/",
        link: `${parentDir}`
      }
    });

  return (
    <div className="directory-header">
      <h2>{directories.map((fragment) => (<a onClick={()=>{onSelectDirectory(fragment.link)}}>{fragment.text}</a>))}</h2>
    </div>
  );
}
