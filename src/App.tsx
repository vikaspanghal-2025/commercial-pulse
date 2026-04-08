import { useState } from "react";
import Sidebar, { type Panel } from "./components/Sidebar";
import Overview from "./panels/Overview";
import PipelineHealth from "./panels/PipelineHealth";
import PricingLeakage from "./panels/PricingLeakage";
import AIAdvisor from "./panels/AIAdvisor";
import SalesCoverage from "./panels/SalesCoverage";
import MarketingROI from "./panels/MarketingROI";

export default function App() {
  const [activePanel, setActivePanel] = useState<Panel>("overview");
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const handleAskAI = (question: string) => {
    setPendingQuestion(question);
    setActivePanel("advisor");
  };

  const handleNavigate = (panel: Panel) => {
    setActivePanel(panel);
  };

  return (
    <div className="flex min-h-screen min-w-[1024px]">
      <Sidebar active={activePanel} onNavigate={handleNavigate} criticalCount={3} />
      <main className="ml-60 flex-1 p-5">
        {activePanel === "overview" && <Overview onNavigate={handleNavigate} onAskAI={handleAskAI} />}
        {activePanel === "pipeline" && <PipelineHealth onAskAI={handleAskAI} onNavigate={handleNavigate} />}
        {activePanel === "pricing" && <PricingLeakage onAskAI={handleAskAI} onNavigate={handleNavigate} />}
        {activePanel === "coverage" && <SalesCoverage onAskAI={handleAskAI} onNavigate={handleNavigate} />}
        {activePanel === "marketing" && <MarketingROI onAskAI={handleAskAI} onNavigate={handleNavigate} />}
        {activePanel === "advisor" && (
          <AIAdvisor initialQuestion={pendingQuestion} onQuestionConsumed={() => setPendingQuestion(null)} onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}
