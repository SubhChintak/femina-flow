import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import NavBar from "@/components/NavBar";
import Calendar from "@/components/Calendar";
import SafeSexDaysCalculator from "@/components/SafeSexDaysCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import { toast } from "@/components/ui/sonner";
import { 
  PeriodData, 
  logPeriodData, 
  getUserPeriodHistory, 
  predictCycles, 
  formatDate,
  getDatesBetween
} from "@/services/periodService";

const PeriodTracker = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  
  // Form states
  const [periodStartDate, setPeriodStartDate] = useState<Date | undefined>(undefined);
  const [periodEndDate, setPeriodEndDate] = useState<Date | undefined>(undefined);
  const [periodFlow, setPeriodFlow] = useState<"light" | "medium" | "heavy">("medium");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Period history and predictions
  const [periodHistory, setPeriodHistory] = useState<PeriodData[]>([]);
  const [periodDates, setPeriodDates] = useState<Date[]>([]);
  const [ovulationDates, setOvulationDates] = useState<Date[]>([]);
  const [predictions, setPredictions] = useState<{
    nextPeriod: string;
    fertileWindow: string;
    ovulationDay: string;
    cycleLength: number;
  }>({
    nextPeriod: "",
    fertileWindow: "",
    ovulationDay: "",
    cycleLength: 28
  });

  // Fetch user period history on load
  useEffect(() => {
    if (!isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to use the period tracker"
      });
      navigate("/auth");
      return;
    }

    const fetchPeriodHistory = async () => {
      if (user) {
        setIsLoading(true);
        const history = await getUserPeriodHistory(user.id);
        setPeriodHistory(history);
        setIsLoading(false);
      }
    };

    fetchPeriodHistory();
  }, [user, isAuthenticated, navigate]);

  // Update calendar dates and predictions when period history changes
  useEffect(() => {
    if (periodHistory.length > 0) {
      // Get period dates for the calendar
      const allPeriodDates: Date[] = [];
      
      periodHistory.slice(0, 3).forEach(period => {
        if (period.end_date) {
          const startDate = new Date(period.start_date);
          const endDate = new Date(period.end_date);
          const datesBetween = getDatesBetween(startDate, endDate);
          allPeriodDates.push(...datesBetween);
        } else {
          allPeriodDates.push(new Date(period.start_date));
        }
      });
      
      setPeriodDates(allPeriodDates);
      
      // Calculate predictions
      const prediction = predictCycles(periodHistory);
      
      setPredictions({
        nextPeriod: `${formatDate(prediction.nextPeriodStart)} - ${formatDate(prediction.nextPeriodEnd)}`,
        fertileWindow: `${formatDate(prediction.fertileWindowStart)} - ${formatDate(prediction.fertileWindowEnd)}`,
        ovulationDay: formatDate(prediction.ovulationDay),
        cycleLength: prediction.averageCycleLength
      });
      
      // Set ovulation dates for calendar
      setOvulationDates([prediction.ovulationDay]);
    }
  }, [periodHistory]);

  const handleLogPeriod = async () => {
    if (!user) {
      toast("Please log in", {
        description: "You need to be logged in to save period data"
      });
      return;
    }

    if (!periodStartDate) {
      toast("Start date required", {
        description: "Please select a period start date"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const periodData: PeriodData = {
        user_id: user.id,
        start_date: periodStartDate.toISOString().split('T')[0],
        end_date: periodEndDate ? periodEndDate.toISOString().split('T')[0] : undefined,
        flow_level: periodFlow,
        notes: notes || undefined
      };
      
      const result = await logPeriodData(periodData);
      
      if (result) {
        // Add the new entry to the period history
        setPeriodHistory(prev => [result, ...prev]);
        
        // Reset form
        setPeriodStartDate(undefined);
        setPeriodEndDate(undefined);
        setPeriodFlow("medium");
        setNotes("");
      }
    } catch (error) {
      console.error("Error logging period:", error);
      toast("Error saving data", {
        description: "There was a problem saving your period data"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format previous cycles data for display
  const formattedPreviousCycles = periodHistory.slice(0, 3).map((period, index) => {
    const startDate = formatDate(new Date(period.start_date));
    const endDate = period.end_date ? formatDate(new Date(period.end_date)) : "In progress";
    const length = index < periodHistory.length - 1 
      ? new Date(periodHistory[index].start_date).getTime() - new Date(periodHistory[index + 1].start_date).getTime()
      : 0;
    const cycleLength = length > 0 ? Math.abs(Math.round(length / (1000 * 60 * 60 * 24))) : "-";
    
    return {
      startDate,
      endDate,
      length: cycleLength
    };
  });

  return (
    <div className="min-h-screen bg-femina-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-femina-900">Period Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <h2 className="text-xl font-semibold mb-4">Menstrual Calendar</h2>
              <Calendar periodDates={periodDates} ovulationDates={ovulationDates} />
              
              <div className="mt-6 p-4 bg-femina-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Predictions</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Next Period</p>
                    <p className="font-semibold">{predictions.nextPeriod || "Insufficient data"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fertile Window</p>
                    <p className="font-semibold">{predictions.fertileWindow || "Insufficient data"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ovulation Day</p>
                    <p className="font-semibold">{predictions.ovulationDay || "Insufficient data"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cycle Length</p>
                    <p className="font-semibold">{predictions.cycleLength} days (average)</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Safe Sex Days Calculator Component */}
            <SafeSexDaysCalculator periodHistory={periodHistory} />
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Log Your Period</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="period-start">Period Start Date</Label>
                  <div className="mt-1">
                    <DatePickerWithPresets 
                      date={periodStartDate} 
                      setDate={setPeriodStartDate}
                      placeholder="Select start date" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="period-end">Period End Date (Optional)</Label>
                  <div className="mt-1">
                    <DatePickerWithPresets 
                      date={periodEndDate} 
                      setDate={setPeriodEndDate}
                      placeholder="Select end date" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="flow">Flow Intensity</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {["light", "medium", "heavy"].map((flow) => (
                      <Button
                        key={flow}
                        type="button"
                        variant={periodFlow === flow ? "default" : "outline"}
                        className={periodFlow === flow ? "bg-femina-500" : ""}
                        onClick={() => setPeriodFlow(flow as "light" | "medium" | "heavy")}
                      >
                        {flow.charAt(0).toUpperCase() + flow.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about your period..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={handleLogPeriod} 
                  className="w-full femina-button"
                  disabled={!periodStartDate || isLoading}
                >
                  {isLoading ? "Saving..." : "Save Period Data"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Previous Cycles</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {formattedPreviousCycles.length > 0 ? (
                    formattedPreviousCycles.map((cycle, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Cycle {formattedPreviousCycles.length - index}</span>
                          <span className="text-sm text-gray-500">{cycle.length} days</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {cycle.startDate} — {cycle.endDate}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No period data recorded yet. Start by logging your period above.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PeriodTracker;
