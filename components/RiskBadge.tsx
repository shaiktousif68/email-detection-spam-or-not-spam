
import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const getStyles = () => {
    switch (level) {
      case RiskLevel.LOW:
        return 'bg-green-100 text-green-700 border-green-200';
      case RiskLevel.MEDIUM:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case RiskLevel.HIGH:
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case RiskLevel.CRITICAL:
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider ${getStyles()}`}>
      {level}
    </span>
  );
};
