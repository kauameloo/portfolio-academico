interface SpinnerProps {
  title: string;
}

export default function Spinner({ title }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">{title}</p>
      </div>
    </div>
  );
}
