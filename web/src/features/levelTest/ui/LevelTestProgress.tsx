interface LevelTestProgressProps {
  current: number;
  total: number;
  progress: number;
}

export function LevelTestProgress({ current, total }: LevelTestProgressProps) {
  return (
    <div className="p-[20px] ">
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < current;
          const isActive = step === current;

          return (
            <div
              key={step}
              className={`h-[6px] min-h-[6px] rounded-[8px] transition-all duration-300 ${
                isCompleted || isActive ? "bg-primary400" : "bg-gray100"
              }`}
              style={{
                width: `${100 / total}%`,
                flex: "1 1 0%",
                minWidth: "10px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
