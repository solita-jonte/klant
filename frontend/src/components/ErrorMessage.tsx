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
    <div className="error-message">
      {error}
    </div>
  );
}
