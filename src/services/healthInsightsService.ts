
import { PeriodData } from "./periodService";

export interface HealthInsight {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface CycleAnalysis {
  averageCycleLength: number;
  cycleVariability: number;
  averagePeriodLength: number;
  isRegular: boolean;
  insights: HealthInsight[];
}

export const analyzeCycleHealth = (periodHistory: PeriodData[]): CycleAnalysis => {
  if (periodHistory.length < 2) {
    return {
      averageCycleLength: 28,
      cycleVariability: 0,
      averagePeriodLength: 5,
      isRegular: true,
      insights: [{
        id: '1',
        type: 'info',
        title: 'Track More Cycles',
        description: 'You need at least 2-3 cycles of data for accurate health insights.',
        recommendation: 'Continue tracking your periods to get personalized health insights.',
        severity: 'low'
      }]
    };
  }

  // Calculate cycle lengths
  const cycleLengths = [];
  for (let i = 0; i < periodHistory.length - 1; i++) {
    const currentDate = new Date(periodHistory[i].start_date);
    const previousDate = new Date(periodHistory[i + 1].start_date);
    const cycleLength = Math.abs((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
    cycleLengths.push(cycleLength);
  }

  // Calculate period lengths
  const periodLengths = periodHistory
    .filter(period => period.end_date)
    .map(period => {
      const startDate = new Date(period.start_date);
      const endDate = new Date(period.end_date!);
      return Math.abs((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    });

  const averageCycleLength = cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length;
  const averagePeriodLength = periodLengths.length > 0 
    ? periodLengths.reduce((sum, length) => sum + length, 0) / periodLengths.length 
    : 5;

  // Calculate variability
  const cycleVariability = calculateVariability(cycleLengths);
  const isRegular = cycleVariability <= 7 && averageCycleLength >= 21 && averageCycleLength <= 35;

  // Generate insights
  const insights = generateHealthInsights(averageCycleLength, cycleVariability, averagePeriodLength, periodHistory);

  return {
    averageCycleLength: Math.round(averageCycleLength),
    cycleVariability: Math.round(cycleVariability),
    averagePeriodLength: Math.round(averagePeriodLength),
    isRegular,
    insights
  };
};

const calculateVariability = (lengths: number[]): number => {
  if (lengths.length < 2) return 0;
  
  const mean = lengths.reduce((sum, length) => sum + length, 0) / lengths.length;
  const variance = lengths.reduce((sum, length) => sum + Math.pow(length - mean, 2), 0) / lengths.length;
  return Math.sqrt(variance);
};

const generateHealthInsights = (
  avgCycleLength: number, 
  variability: number, 
  avgPeriodLength: number, 
  periodHistory: PeriodData[]
): HealthInsight[] => {
  const insights: HealthInsight[] = [];

  // Cycle length insights
  if (avgCycleLength < 21) {
    insights.push({
      id: 'short-cycles',
      type: 'warning',
      title: 'Short Menstrual Cycles',
      description: 'Your average cycle length is shorter than normal (less than 21 days).',
      recommendation: 'Consider consulting with a healthcare provider to discuss potential causes such as thyroid issues or stress.',
      severity: 'medium'
    });
  } else if (avgCycleLength > 35) {
    insights.push({
      id: 'long-cycles',
      type: 'warning',
      title: 'Long Menstrual Cycles',
      description: 'Your average cycle length is longer than normal (more than 35 days).',
      recommendation: 'Long cycles may indicate PCOS or other hormonal imbalances. Consider speaking with a healthcare provider.',
      severity: 'medium'
    });
  } else {
    insights.push({
      id: 'normal-cycles',
      type: 'success',
      title: 'Healthy Cycle Length',
      description: 'Your cycle length is within the normal range (21-35 days).',
      recommendation: 'Continue maintaining your current lifestyle and tracking habits.',
      severity: 'low'
    });
  }

  // Variability insights
  if (variability > 7) {
    insights.push({
      id: 'irregular-cycles',
      type: 'warning',
      title: 'Irregular Cycle Pattern',
      description: 'Your cycle lengths vary significantly from month to month.',
      recommendation: 'Track stress levels, sleep, and diet. Consider lifestyle modifications and consult a healthcare provider if irregularity persists.',
      severity: 'medium'
    });
  }

  // Period length insights
  if (avgPeriodLength < 3) {
    insights.push({
      id: 'short-periods',
      type: 'warning',
      title: 'Short Period Duration',
      description: 'Your periods are shorter than average (less than 3 days).',
      recommendation: 'Short periods may indicate low estrogen levels. Consider discussing with a healthcare provider.',
      severity: 'medium'
    });
  } else if (avgPeriodLength > 7) {
    insights.push({
      id: 'long-periods',
      type: 'warning',
      title: 'Long Period Duration',
      description: 'Your periods last longer than average (more than 7 days).',
      recommendation: 'Extended bleeding may indicate hormonal imbalances or other conditions. Consult with a healthcare provider.',
      severity: 'high'
    });
  }

  // Heavy flow insights
  const heavyFlowCount = periodHistory.filter(period => period.flow_level === 'heavy').length;
  if (heavyFlowCount > periodHistory.length * 0.5) {
    insights.push({
      id: 'heavy-flow',
      type: 'warning',
      title: 'Frequently Heavy Flow',
      description: 'You experience heavy flow more than half the time.',
      recommendation: 'Heavy menstrual bleeding can lead to anemia. Consider tracking symptoms and consulting with a healthcare provider.',
      severity: 'high'
    });
  }

  return insights;
};

export const getCurrentCyclePhase = (lastPeriodStart: string, averageCycleLength: number): string => {
  const lastPeriod = new Date(lastPeriodStart);
  const today = new Date();
  const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLastPeriod <= 5) {
    return 'menstrual';
  } else if (daysSinceLastPeriod <= averageCycleLength / 2 - 2) {
    return 'follicular';
  } else if (daysSinceLastPeriod <= averageCycleLength / 2 + 2) {
    return 'ovulation';
  } else {
    return 'luteal';
  }
};
