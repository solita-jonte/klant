export interface ErrorMessageProps {
  error: string,
}

export function ErrorMessage({
  error,
}: ErrorMessageProps) {

  console.log("Error message: " + error);

  if (!error) {
    return null;
  }

  return (
    <div className="error-message">
      {error}
    </div>
  );
}
