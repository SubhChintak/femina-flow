
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { saveSymptomLog, getSymptomLogByDate, formatDateForDB, SymptomLog } from "@/services/symptomService";
import { toast } from "@/hooks/use-toast";

const commonSymptoms = [
  { id: "cramps", label: "Cramps" },
  { id: "headache", label: "Headache" },
  { id: "bloating", label: "Bloating" },
  { id: "backache", label: "Backache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "mood_swings", label: "Mood Swings" },
  { id: "breast_tenderness", label: "Breast Tenderness" },
  { id: "nausea", label: "Nausea" },
  { id: "acne", label: "Acne" },
  { id: "joint_pain", label: "Joint Pain" },
];

const moodOptions = [
  { id: "happy", label: "Happy" },
  { id: "calm", label: "Calm" },
  { id: "sensitive", label: "Sensitive" },
  { id: "irritable", label: "Irritable" },
  { id: "sad", label: "Sad" },
  { id: "anxious", label: "Anxious" },
];

const energyLevels = ["Very Low", "Low", "Moderate", "High", "Very High"];

const SymptomTracker = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>(formatDateForDB(new Date()));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [energyLevel, setEnergyLevel] = useState<number>(2);
  const [painLevel, setPainLevel] = useState<number>(0);
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing data for selected date
  useEffect(() => {
    if (user && selectedDate) {
      loadSymptomData();
    }
  }, [user, selectedDate]);

  const loadSymptomData = async () => {
    if (!user) return;

    try {
      const existingLog = await getSymptomLogByDate(user.id, selectedDate);
      if (existingLog) {
        setSelectedSymptoms(existingLog.physical_symptoms || []);
        setSelectedMood(existingLog.mood || "");
        setEnergyLevel(existingLog.energy_level || 2);
        setPainLevel(existingLog.pain_level || 0);
        setSleepHours(existingLog.sleep_hours || 8);
        setSleepQuality(existingLog.sleep_quality || 3);
        setNotes(existingLog.notes || "");
      } else {
        // Reset form for new date
        setSelectedSymptoms([]);
        setSelectedMood("");
        setEnergyLevel(2);
        setPainLevel(0);
        setSleepHours(8);
        setSleepQuality(3);
        setNotes("");
      }
    } catch (error) {
      console.error("Error loading symptom data:", error);
    }
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleMoodChange = (moodId: string) => {
    setSelectedMood(selectedMood === moodId ? "" : moodId);
  };

  const handleLogSymptoms = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save symptom data.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const symptomData: SymptomLog = {
      user_id: user.id,
      log_date: selectedDate,
      mood: selectedMood || null,
      physical_symptoms: selectedSymptoms,
      energy_level: energyLevel,
      pain_level: painLevel,
      sleep_hours: sleepHours,
      sleep_quality: sleepQuality,
      notes: notes.trim() || null,
    };

    try {
      await saveSymptomLog(symptomData);
    } catch (error) {
      console.error("Error saving symptoms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to track your symptoms.</p>
          <Button onClick={() => window.location.href = '/auth'}>
            Go to Login
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <Label htmlFor="date">Select Date</Label>
        <Input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={formatDateForDB(new Date())}
          className="w-full mt-1"
        />
      </div>

      <Tabs defaultValue="physical">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>
        
        <TabsContent value="physical">
          <h3 className="text-lg font-medium mb-3">Physical Symptoms</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {commonSymptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={symptom.id} 
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => toggleSymptom(symptom.id)}
                />
                <label htmlFor={symptom.id} className="text-sm cursor-pointer">
                  {symptom.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Pain Level: {painLevel}/10</h3>
            <div className="px-2">
              <Slider
                value={[painLevel]}
                max={10}
                step={1}
                onValueChange={(vals) => setPainLevel(vals[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>None</span>
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mood">
          <h3 className="text-lg font-medium mb-3">How are you feeling?</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {moodOptions.map((mood) => (
              <Button
                key={mood.id}
                variant={selectedMood === mood.id ? "default" : "outline"}
                className={`rounded-full ${
                  selectedMood === mood.id ? "bg-femina-500" : ""
                }`}
                onClick={() => handleMoodChange(mood.id)}
              >
                {mood.label}
              </Button>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="energy">
          <h3 className="text-lg font-medium mb-3">Energy Level: {energyLevels[energyLevel]}</h3>
          <div className="px-2 mb-6">
            <Slider
              value={[energyLevel]}
              max={4}
              step={1}
              onValueChange={(vals) => setEnergyLevel(vals[0])}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {energyLevels.map((level, index) => (
                <span 
                  key={level} 
                  className={energyLevel === index ? "font-medium text-femina-700" : ""}
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sleep">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Sleep Hours: {sleepHours}h</h3>
              <div className="px-2">
                <Slider
                  value={[sleepHours]}
                  max={12}
                  min={0}
                  step={0.5}
                  onValueChange={(vals) => setSleepHours(vals[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span>6h</span>
                  <span>12h</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Sleep Quality: {sleepQuality}/5</h3>
              <div className="px-2">
                <Slider
                  value={[sleepQuality]}
                  max={5}
                  min={1}
                  step={1}
                  onValueChange={(vals) => setSleepQuality(vals[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional notes about your day..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1"
        />
      </div>
      
      <Button 
        onClick={handleLogSymptoms}
        className="w-full mt-6 femina-button"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Symptoms"}
      </Button>
    </Card>
  );
};

export default SymptomTracker;
