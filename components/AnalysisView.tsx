
import React from 'react';
import { EmailAnalysis } from '../types';
import { RiskBadge } from './RiskBadge';

interface AnalysisViewProps {
  analysis: EmailAnalysis;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium mb-1">Security Risk</span>
          <RiskBadge level={analysis.riskLevel} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium mb-1">AI Confidence</span>
          <span className="text-3xl font-bold text-blue-600">{analysis.confidenceScore}%</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium mb-1">Email Type</span>
          <span className={`text-lg font-bold ${analysis.isSpam ? 'text-red-600' : 'text-green-600'}`}>
            {analysis.isSpam ? 'Potential Threat' : 'Likely Safe'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary & Intent */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <i className="fa-solid fa-file-lines text-blue-500 mr-2"></i>
              Executive Summary
            </h3>
            <p className="text-slate-600 leading-relaxed italic">"{analysis.summary}"</p>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <i className="fa-solid fa-bullseye text-purple-500 mr-2"></i>
              Sender Intent
            </h3>
            <p className="text-slate-600 leading-relaxed">{analysis.senderIntent}</p>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <i className="fa-solid fa-info-circle text-indigo-500 mr-2"></i>
              Metadata Context
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Claimed Sender</span>
                <span className="font-medium text-slate-800">{analysis.keyInformation.sender}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Organization</span>
                <span className="font-medium text-slate-800">{analysis.keyInformation.organization}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Urgency Level</span>
                <span className={`font-medium ${analysis.keyInformation.urgency.toLowerCase().includes('high') ? 'text-red-500' : 'text-slate-800'}`}>
                  {analysis.keyInformation.urgency}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Action Items & Indicators */}
        <div className="space-y-6">
          {analysis.actionItems.length > 0 && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                <i className="fa-solid fa-list-check text-green-500 mr-2"></i>
                Detected Requests
              </h3>
              <ul className="space-y-2">
                {analysis.actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start text-slate-600">
                    <span className="inline-block w-5 h-5 bg-green-50 text-green-600 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] mr-3 mt-1 font-bold">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {analysis.phishingIndicators.length > 0 && (
            <section className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
                <i className="fa-solid fa-triangle-exclamation text-red-600 mr-2"></i>
                Risk Indicators
              </h3>
              <ul className="space-y-2">
                {analysis.phishingIndicators.map((flag, idx) => (
                  <li key={idx} className="flex items-start text-red-700">
                    <i className="fa-solid fa-circle-notch text-[8px] mt-2 mr-2"></i>
                    {flag}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <i className="fa-solid fa-masks-theater text-amber-500 mr-2"></i>
              Emotional Tone
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.tone.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
