
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SymptomLog } from "@/services/symptomService";
import { format, parseISO } from "date-fns";

interface SymptomChartProps {
  data: SymptomLog[];
}

const SymptomChart = ({ data }: SymptomChartProps) => {
  // Prepare data for charts
  const chartData = data
    .slice(-30) // Last 30 days
    .reverse()
    .map(log => ({
      date: format(parseISO(log.log_date), 'MMM dd'),
      fullDate: log.log_date,
      painLevel: log.pain_level || 0,
      energyLevel: log.energy_level || 0,
      sleepHours: log.sleep_hours || 0,
      sleepQuality: log.sleep_quality || 0,
      symptomCount: log.physical_symptoms?.length || 0,
    }));

  const chartConfig = {
    painLevel: {
      label: "Pain Level",
      color: "#ef4444",
    },
    energyLevel: {
      label: "Energy Level", 
      color: "#22c55e",
    },
    sleepHours: {
      label: "Sleep Hours",
      color: "#3b82f6",
    },
    sleepQuality: {
      label: "Sleep Quality",
      color: "#8b5cf6",
    },
    symptomCount: {
      label: "Symptom Count",
      color: "#f59e0b",
    },
  };

  if (data.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          No symptom data available yet. Start logging your symptoms to see trends!
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Symptom Trends (Last 30 Days)</h3>
      
      <Tabs defaultValue="pain-energy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pain-energy">Pain & Energy</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
          <TabsTrigger value="symptoms">Symptom Count</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pain-energy" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="painLevel" 
                  stroke="var(--color-painLevel)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energyLevel" 
                  stroke="var(--color-energyLevel)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="sleep" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="sleepHours" 
                  stroke="var(--color-sleepHours)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleepQuality" 
                  stroke="var(--color-sleepQuality)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="symptoms" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="symptomCount" fill="var(--color-symptomCount)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SymptomChart;
