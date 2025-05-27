
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export interface PeriodData {
  id?: string;
  user_id: string;
  start_date: string;
  end_date?: string;
  flow_level?: 'light' | 'medium' | 'heavy';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Save period data
export const savePeriodData = async (periodData: PeriodData): Promise<PeriodData | null> => {
  try {
    console.log('Saving period data:', periodData);
    
    const { data, error } = await supabase
      .from('period_logs')
      .upsert(periodData)
      .select()
      .single();

    if (error) {
      console.error('Error saving period data:', error);
      toast({
        title: "Error saving period data",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Period data saved",
      description: "Your period data has been successfully logged.",
    });
    
    // Type assertion to ensure flow_level is properly typed
    return {
      ...data,
      flow_level: data.flow_level as 'light' | 'medium' | 'heavy' | undefined
    };
  } catch (error) {
    console.error("Error in savePeriodData:", error);
    toast({
      title: "Something went wrong",
      description: "Could not save your period data. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Log period data (alias for savePeriodData for compatibility)
export const logPeriodData = savePeriodData;

// Get user's period history
export const getUserPeriodHistory = async (userId: string): Promise<PeriodData[]> => {
  try {
    console.log('Fetching period history for user:', userId);
    
    const { data, error } = await supabase
      .from('period_logs')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching period history:', error);
      toast({
        title: "Error fetching period history",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }

    // Type assertion to ensure flow_level is properly typed
    return (data || []).map(item => ({
      ...item,
      flow_level: item.flow_level as 'light' | 'medium' | 'heavy' | undefined
    }));
  } catch (error) {
    console.error("Error in getUserPeriodHistory:", error);
    return [];
  }
};

// Helper function to format date for display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper function to format date for database
export const formatDateForDB = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper function to get dates between two dates
export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

// Predict cycles based on period history
export const predictCycles = (periodHistory: PeriodData[]) => {
  if (periodHistory.length < 2) {
    // Default predictions if not enough data
    const today = new Date();
    const nextPeriodStart = new Date(today);
    nextPeriodStart.setDate(today.getDate() + 28);
    
    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodStart.getDate() + 5);
    
    const ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);
    
    const fertileWindowStart = new Date(ovulationDay);
    fertileWindowStart.setDate(ovulationDay.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDay);
    fertileWindowEnd.setDate(ovulationDay.getDate() + 1);
    
    return {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDay,
      fertileWindowStart,
      fertileWindowEnd,
      averageCycleLength: 28
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

  // Predict next period
  const lastPeriod = new Date(periodHistory[0].start_date);
  const nextPeriodStart = new Date(lastPeriod);
  nextPeriodStart.setDate(lastPeriod.getDate() + averageCycleLength);
  
  const nextPeriodEnd = new Date(nextPeriodStart);
  nextPeriodEnd.setDate(nextPeriodStart.getDate() + 5); // Assume 5-day period
  
  // Calculate ovulation (typically 14 days before next period)
  const ovulationDay = new Date(nextPeriodStart);
  ovulationDay.setDate(nextPeriodStart.getDate() - 14);
  
  // Calculate fertile window (5 days before ovulation + ovulation day)
  const fertileWindowStart = new Date(ovulationDay);
  fertileWindowStart.setDate(ovulationDay.getDate() - 5);
  
  const fertileWindowEnd = new Date(ovulationDay);
  fertileWindowEnd.setDate(ovulationDay.getDate() + 1);
  
  return {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDay,
    fertileWindowStart,
    fertileWindowEnd,
    averageCycleLength
  };
};
