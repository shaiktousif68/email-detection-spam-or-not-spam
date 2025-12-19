
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface EmailAnalysis {
  riskLevel: RiskLevel;
  isSpam: boolean;
  confidenceScore: number;
  summary: string;
  senderIntent: string;
  tone: string[];
  actionItems: string[];
  phishingIndicators: string[];
  keyInformation: {
    sender: string;
    organization: string;
    urgency: string;
  };
}

export interface AnalysisState {
  loading: boolean;
  error: string | null;
  result: EmailAnalysis | null;
}
