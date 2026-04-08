interface TopBarProps {
  title: string;
  criticalCount: number;
  onNavigateOverview?: () => void;
}

export default function TopBar({ title, criticalCount, onNavigateOverview }: TopBarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="flex items-center gap-4">
        {criticalCount > 0 && (
          <button
            onClick={onNavigateOverview}
            className="text-xs bg-bain-red-bg text-bain-red-light px-2.5 py-1 rounded-full cursor-pointer hover:bg-bain-red/25 transition-colors"
          >
            {criticalCount} critical gap{criticalCount > 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
}
