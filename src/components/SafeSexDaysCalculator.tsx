
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Shield, Heart } from "lucide-react";
import { PeriodData, formatDate } from "@/services/periodService";

interface SafeSexDaysCalculatorProps {
  periodHistory: PeriodData[];
}

const SafeSexDaysCalculator = ({ periodHistory }: SafeSexDaysCalculatorProps) => {
  const calculateSafeDays = () => {
    if (periodHistory.length < 2) {
      return {
        safeDays: "Insufficient data",
        nextSafePeriod: "Need more cycle data",
        riskLevel: "unknown"
      };
    }

    // Calculate average cycle length
    const cycleLengths = [];
    for (let i = 0; i < periodHistory.length - 1; i++) {
      const currentPeriod = new Date(periodHistory[i].start_date);
      const previousPeriod = new Date(periodHistory[i + 1].start_date);
      const cycleLength = Math.abs((currentPeriod.getTime() - previousPeriod.getTime()) / (1000 * 60 * 60 * 24));
      cycleLengths.push(cycleLength);
    }
    
    const averageCycleLength = cycleLengths.length > 0 
      ? Math.round(cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length)
      : 28;

    // Calculate next period and fertile window
    const lastPeriod = new Date(periodHistory[0].start_date);
    const nextPeriodStart = new Date(lastPeriod);
    nextPeriodStart.setDate(lastPeriod.getDate() + averageCycleLength);
    
    // Ovulation typically occurs 14 days before next period
    const ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);
    
    // Fertile window: 5 days before ovulation + ovulation day + 1 day after
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 1);
    
    // Safe days are typically during menstruation and a few days after, and after fertile window
    const safeStart1 = new Date(nextPeriodStart);
    const safeEnd1 = new Date(nextPeriodStart);
    safeEnd1.setDate(nextPeriodStart.getDate() + 7); // During period + few days after
    
    const safeStart2 = new Date(fertileEnd);
    safeStart2.setDate(fertileEnd.getDate() + 2); // 2 days after fertile window ends
    
    const safeEnd2 = new Date(nextPeriodStart);
    safeEnd2.setDate(nextPeriodStart.getDate() + averageCycleLength - 5); // Until 5 days before next period
    
    const today = new Date();
    let currentRiskLevel = "moderate";
    
    // Determine current risk level
    if (today >= fertileStart && today <= fertileEnd) {
      currentRiskLevel = "high";
    } else if ((today >= safeStart1 && today <= safeEnd1) || (today >= safeStart2 && today <= safeEnd2)) {
      currentRiskLevel = "low";
    }
    
    return {
      safeDays: `${formatDate(safeStart1)} - ${formatDate(safeEnd1)} & ${formatDate(safeStart2)} - ${formatDate(safeEnd2)}`,
      nextSafePeriod: `${formatDate(safeStart2)} - ${formatDate(safeEnd2)}`,
      riskLevel: currentRiskLevel,
      fertileWindow: `${formatDate(fertileStart)} - ${formatDate(fertileEnd)}`
    };
  };

  const safeData = calculateSafeDays();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50";
      case "high": return "text-red-600 bg-red-50";
      default: return "text-yellow-600 bg-yellow-50";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <Shield className="w-5 h-5 text-green-600" />;
      case "high": return <Heart className="w-5 h-5 text-red-600" />;
      default: return <Calendar className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-pink-800">
          <Shield className="w-6 h-6" />
          Safe Sex Days Calculator
        </CardTitle>
        <p className="text-sm text-pink-600">
          Based on your menstrual cycle data. Remember, this is an estimate - always use protection for safety.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/70 rounded-lg border border-pink-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-pink-600" />
              <h4 className="font-semibold text-pink-800">Current Risk Level</h4>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getRiskColor(safeData.riskLevel)}`}>
              {getRiskIcon(safeData.riskLevel)}
              <span className="font-medium capitalize">{safeData.riskLevel} Risk</span>
            </div>
          </div>
          
          <div className="p-4 bg-white/70 rounded-lg border border-pink-100">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-600" />
              <h4 className="font-semibold text-pink-800">Fertile Window</h4>
            </div>
            <p className="text-sm text-gray-700">
              {safeData.fertileWindow || "Calculating..."}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-white/70 rounded-lg border border-pink-100">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold text-pink-800">Estimated Safe Days</h4>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            {safeData.safeDays}
          </p>
          <div className="text-xs text-pink-600 bg-pink-100 p-2 rounded border border-pink-200">
            <strong>Important:</strong> This calculation is based on the rhythm method and is not 100% reliable. 
            Always consult with healthcare professionals and consider using additional contraceptive methods.
          </div>
        </div>
        
        <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg border border-pink-200">
          <p className="text-xs text-pink-700 text-center">
            💡 <strong>Reminder:</strong> Natural family planning methods have varying effectiveness. 
            For maximum protection, combine with barrier methods or hormonal contraceptives.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafeSexDaysCalculator;
