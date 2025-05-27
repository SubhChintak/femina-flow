
import { Progress } from "@/components/ui/progress";

interface CycleChartProps {
  currentDay: number;
  totalDays: number;
  periodStart: number;
  periodEnd: number;
  ovulationDay: number;
}

const CycleChart = ({
  currentDay,
  totalDays,
  periodStart,
  periodEnd,
  ovulationDay,
}: CycleChartProps) => {
  const progressPercentage = (currentDay / totalDays) * 100;
  const isPeriod = currentDay >= periodStart && currentDay <= periodEnd;
  const isOvulation = currentDay === ovulationDay || currentDay === ovulationDay + 1;

  const getStatusText = () => {
    if (isPeriod) {
      return "Period";
    } else if (isOvulation) {
      return "Ovulation";
    } else if (currentDay < periodStart) {
      return "Follicular Phase";
    } else {
      return "Luteal Phase";
    }
  };

  const getStatusColor = () => {
    if (isPeriod) {
      return "bg-blush-500";
    } else if (isOvulation) {
      return "bg-sky-500";
    } else {
      return "bg-femina-500";
    }
  };

  const getDaysInfo = () => {
    if (isPeriod) {
      return `Day ${currentDay - periodStart + 1} of period`;
    } else if (isOvulation) {
      return "Fertility peak";
    } else if (currentDay < periodStart) {
      const daysUntil = periodStart - currentDay;
      return `${daysUntil} day${daysUntil !== 1 ? 's' : ''} until period`;
    } else {
      return `${currentDay} days from period start`;
    }
  };

  return (
    <div className="femina-card mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-2">Cycle Day {currentDay}</h2>
      <div className="mb-4">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Day 1</span>
          <span>Day {totalDays}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <h3 className="font-medium">{getStatusText()}</h3>
          </div>
          <p className="text-sm text-gray-500">{getDaysInfo()}</p>
        </div>
        
        <div className="text-right">
          <p className="font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>
      </div>
    </div>
  );
};

export default CycleChart;
