interface AIRecommendationProps {
  title: string;
  content: string;
  onAsk?: () => void;
}

export default function AIRecommendation({ title, content, onAsk }: AIRecommendationProps) {
  return (
    <div className="bg-gradient-to-br from-navy-card/80 to-navy-surface/60 border border-white/10 rounded-xl p-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-bain-red-bg flex items-center justify-center">
          <span className="text-bain-red-light text-xs font-bold">AI</span>
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {onAsk && (
          <button onClick={onAsk} className="ml-auto text-xs text-bain-red-light hover:text-bain-red cursor-pointer">
            Explore in AI Advisor →
          </button>
        )}
      </div>
      <div className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{content}</div>
    </div>
  );
}
