export interface ErrorMessageProps {
  error: string,
}

export function ErrorMessage({
  error,
}: ErrorMessageProps) {

  if (!error) {
    return null;
  }

  console.log("Error message: " + error);
  return (
    <div className="px-6 py-2 text-xl text-red-800">
      {error}
    </div>
  );
}
