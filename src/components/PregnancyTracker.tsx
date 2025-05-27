
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FertilityTracker from "./FertilityTracker";
import FetalDevelopmentTracker from "./FetalDevelopmentTracker";

const PregnancyTracker = () => {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [mode, setMode] = useState<"pregnancy" | "fertility">("pregnancy");
  
  const calculateWeeks = () => {
    if (!dueDate) return { weeks: 0, days: 0, progress: 0 };
    
    // Assuming 40 weeks for full term
    const today = new Date();
    const conception = new Date(dueDate);
    conception.setDate(conception.getDate() - 280); // ~40 weeks before due date
    
    const diffTime = today.getTime() - conception.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    const progress = Math.min((weeks / 40) * 100, 100);
    
    return { weeks, days, progress };
  };
  
  const { weeks, days, progress } = calculateWeeks();
  
  const getTrimester = () => {
    if (weeks < 13) return "First Trimester";
    if (weeks < 27) return "Second Trimester";
    return "Third Trimester";
  };
  
  const handleSetPregnancy = () => {
    if (dueDate) {
      setIsConfigured(true);
      setMode("pregnancy");
    } else {
      alert("Please select your due date");
    }
  };
  
  const resetPregnancy = () => {
    setDueDate(undefined);
    setIsConfigured(false);
    setMode("pregnancy");
  };

  const switchToFertilityMode = () => {
    setMode("fertility");
    setIsConfigured(false);
  };

  return (
    <div className="space-y-6">
      {!isConfigured ? (
        <Card className="p-5">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pregnancy & Fertility Tracking</h2>
            
            <Tabs defaultValue="pregnancy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="pregnancy">Pregnancy Mode</TabsTrigger>
                <TabsTrigger value="fertility">Fertility Mode</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pregnancy">
                <div className="space-y-4">
                  <p className="text-gray-600">Select your estimated due date to start tracking your pregnancy journey.</p>
                  
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md mb-4 pointer-events-auto"
                  />
                  
                  <Button 
                    onClick={handleSetPregnancy} 
                    className="w-full femina-button"
                  >
                    Start Pregnancy Tracking
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="fertility">
                <div className="space-y-4">
                  <p className="text-gray-600">Track your fertility and optimize your chances of conception.</p>
                  <FertilityTracker />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Week {weeks}</h2>
              <span className="bg-femina-100 text-femina-700 px-3 py-1 rounded-full text-sm font-medium">
                {getTrimester()}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Week {weeks}, Day {days}</span>
                <span>{40 - weeks} weeks remaining</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-semibold">{dueDate?.toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Baby Size</p>
                <p className="font-semibold">
                  {weeks <= 10 ? "Like a strawberry" : 
                   weeks <= 20 ? "Like an avocado" : 
                   weeks <= 30 ? "Like an eggplant" : "Like a watermelon"}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Button 
                variant="outline" 
                onClick={resetPregnancy}
                className="flex-1"
              >
                Reset Pregnancy Tracking
              </Button>
              <Button 
                variant="outline" 
                onClick={switchToFertilityMode}
                className="flex-1"
              >
                Switch to Fertility Mode
              </Button>
            </div>
          </Card>

          <FetalDevelopmentTracker weeks={weeks} days={days} />
        </div>
      )}
    </div>
  );
};

export default PregnancyTracker;
