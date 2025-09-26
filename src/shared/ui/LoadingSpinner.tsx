interface LoadingSpinnerProps {
  message: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-blue-500 border-b-2" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
