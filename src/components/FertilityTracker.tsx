
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Target, Calendar as CalendarIcon } from "lucide-react";
import { predictCycles, getUserPeriodHistory, formatDate } from "@/services/periodService";

const FertilityTracker = () => {
  const [periodHistory, setPeriodHistory] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      // In a real app, you'd get the user ID from auth context
      const mockUserId = "user-123";
      const history = await getUserPeriodHistory(mockUserId);
      setPeriodHistory(history);
      
      const cyclePredictions = predictCycles(history);
      setPredictions(cyclePredictions);
    };
    
    loadData();
  }, []);

  const getFertilityStatus = () => {
    if (!predictions) return { status: "unknown", message: "Loading..." };
    
    const today = new Date();
    const { fertileWindowStart, fertileWindowEnd, ovulationDay } = predictions;
    
    if (today >= fertileWindowStart && today <= fertileWindowEnd) {
      return { 
        status: "fertile", 
        message: "You are in your fertile window",
        color: "bg-green-100 text-green-700"
      };
    }
    
    const daysToFertile = Math.ceil((fertileWindowStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysToFertile > 0 && daysToFertile <= 7) {
      return { 
        status: "approaching", 
        message: `Fertile window starts in ${daysToFertile} days`,
        color: "bg-yellow-100 text-yellow-700"
      };
    }
    
    return { 
      status: "not-fertile", 
      message: "Not in fertile window",
      color: "bg-gray-100 text-gray-700"
    };
  };

  const getCycleProgress = () => {
    if (!predictions || !periodHistory.length) return 0;
    
    const today = new Date();
    const lastPeriod = new Date(periodHistory[0]?.start_date || today);
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min((daysSinceLastPeriod / predictions.averageCycleLength) * 100, 100);
  };

  const fertilityStatus = getFertilityStatus();
  const cycleProgress = getCycleProgress();

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-femina-600" />
        <h2 className="text-xl font-semibold">Fertility Tracking</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <Badge className={fertilityStatus.color}>
              {fertilityStatus.message}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cycle Progress</span>
                <span>{Math.round(cycleProgress)}%</span>
              </div>
              <Progress value={cycleProgress} className="h-2" />
            </div>

            {predictions && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-femina-600" />
                  <div>
                    <p className="text-sm font-medium">Next Ovulation</p>
                    <p className="text-sm text-gray-600">{formatDate(predictions.ovulationDay)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-femina-600" />
                  <div>
                    <p className="text-sm font-medium">Fertile Window</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(predictions.fertileWindowStart)} - {formatDate(predictions.fertileWindowEnd)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-femina-600" />
                  <div>
                    <p className="text-sm font-medium">Next Period</p>
                    <p className="text-sm text-gray-600">{formatDate(predictions.nextPeriodStart)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={predictions ? {
              fertile: (date) => {
                const { fertileWindowStart, fertileWindowEnd } = predictions;
                return date >= fertileWindowStart && date <= fertileWindowEnd;
              },
              ovulation: (date) => {
                return date.toDateString() === predictions.ovulationDay.toDateString();
              },
              period: (date) => {
                return date.toDateString() === predictions.nextPeriodStart.toDateString();
              }
            } : {}}
            modifiersStyles={{
              fertile: { backgroundColor: '#dcfce7', color: '#166534' },
              ovulation: { backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold' },
              period: { backgroundColor: '#fce7f3', color: '#be185d' }
            }}
          />
          
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Fertile Days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
              <span>Ovulation Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-200 rounded"></div>
              <span>Expected Period</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="font-medium mb-2">Fertility Tips</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Track your cycle consistently for better predictions</p>
          <p>• Monitor cervical mucus changes</p>
          <p>• Consider basal body temperature tracking</p>
          <p>• Maintain a healthy lifestyle and manage stress</p>
        </div>
      </div>
    </Card>
  );
};

export default FertilityTracker;
