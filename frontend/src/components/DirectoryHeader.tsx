type Fragment = {
  text: string,
  link: string,
}

export interface DirectoryHeaderProps {
  directory: string,
  onSelectDirectory: (dir: string) => void,
}

export function DirectoryHeader({
  directory,
  onSelectDirectory,
}:DirectoryHeaderProps) {
  const directories = directory
    .split("/")
    .filter((fragment, index) => index===0 || fragment)
    .reduce<Fragment[]>((acc, fragment) => {
      const parentDir = acc.reduce((parDir, frag) => {return parDir + frag.text;}, "");
      const link = (parentDir.endsWith("/") ? parentDir : parentDir + "/") + fragment;
      acc.push({
        text: fragment + "/",
        link,
      });
      return acc;
    }, []);

  return (
    <div className="py-3">
      <h2 className="text-2xl">
        {directories.map((fragment) => (
          <a
            className="hover:underline hover:text-blue-700 cursor-pointer"
            key={fragment.link}
            onClick={()=>{onSelectDirectory(fragment.link)}}
          >
            {fragment.text}
          </a>
        ))}
      </h2>
    </div>
  );
}
