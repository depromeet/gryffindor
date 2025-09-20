interface LevelTestProgressProps {
  current: number;
  total: number;
  progress: number;
}

export function LevelTestProgress({ current, total }: LevelTestProgressProps) {
  return (
    <div className="border-gray-200 border-b bg-white px-4 py-4">
      <div className="flex items-center justify-center space-x-1">
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < current;
          const isActive = step === current;

          return (
            <div
              key={step}
              className={`h-1 rounded-full transition-all duration-300 ${
                isCompleted || isActive ? "bg-primary400" : "bg-gray100"
              }`}
              style={{
                width: `${100 / total}%`,
                flex: "1 1 0%",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
