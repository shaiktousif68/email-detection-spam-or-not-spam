
import React, { useState, useCallback } from 'react';
import { analyzeEmail } from './services/geminiService';
import { AnalysisState } from './types';
import { AnalysisView } from './components/AnalysisView';

const App: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisState>({
    loading: false,
    error: null,
    result: null,
  });

  const handleAnalyze = useCallback(async () => {
    if (!emailContent.trim()) return;

    setAnalysis(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await analyzeEmail(emailContent);
      setAnalysis({
        loading: false,
        error: null,
        result,
      });
    } catch (err) {
      setAnalysis({
        loading: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred.',
        result: null,
      });
    }
  }, [emailContent]);

  const reset = () => {
    setEmailContent('');
    setAnalysis({ loading: false, error: null, result: null });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-white"></i>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Email Guardian AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-1 text-slate-500 text-sm">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase mr-2">Powered by Gemini 3</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Smart Threat Detection</h1>
          <p className="text-slate-500">Paste raw email content below to identify phishing, extract tasks, and analyze sentiment.</p>
        </header>

        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
          <div className="p-1 bg-slate-50 border-b border-slate-100 flex items-center px-4 space-x-2">
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
             <div className="w-3 h-3 rounded-full bg-green-400"></div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest ml-4">Analyze Module v1.0</span>
          </div>
          <div className="p-6">
            <textarea
              className="w-full h-48 md:h-64 p-4 text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none font-sans text-sm md:text-base"
              placeholder="Paste raw email text here (including headers if possible)..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              disabled={analysis.loading}
            />
            
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 flex items-center">
                <i className="fa-solid fa-lock mr-1"></i> Private & secure analysis
              </p>
              <div className="flex space-x-3 w-full md:w-auto">
                {analysis.result && (
                  <button
                    onClick={reset}
                    className="flex-1 md:flex-none px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={analysis.loading || !emailContent.trim()}
                  className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    analysis.loading || !emailContent.trim()
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {analysis.loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <span>Inspect Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {analysis.error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl mb-8 flex items-center space-x-3">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <p className="font-medium">{analysis.error}</p>
          </div>
        )}

        {analysis.result && <AnalysisView analysis={analysis.result} />}

        {!analysis.result && !analysis.loading && !analysis.error && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <i className="fa-solid fa-envelope-open-text text-2xl"></i>
            </div>
            <h3 className="text-slate-400 font-medium">Analysis results will appear here</h3>
          </div>
        )}
      </main>

      {/* Persistent CTA / Info Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300">Guardian Core Active</span>
        </div>
        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          AI Detection Suite
        </div>
      </div>
    </div>
  );
};

export default App;
