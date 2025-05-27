
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export interface SymptomLog {
  id?: string;
  user_id: string;
  log_date: string;
  mood?: string;
  physical_symptoms?: string[];
  energy_level?: number;
  pain_level?: number;
  sleep_hours?: number;
  sleep_quality?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// Save or update symptom log for a specific date
export const saveSymptomLog = async (symptomData: SymptomLog): Promise<SymptomLog | null> => {
  try {
    console.log('Saving symptom log:', symptomData);
    
    const { data, error } = await supabase
      .from('symptom_logs')
      .upsert(symptomData, {
        onConflict: 'user_id,log_date'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving symptom log:', error);
      toast({
        title: "Error saving symptoms",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    toast({
      title: "Symptoms saved",
      description: "Your symptom data has been successfully logged.",
    });
    
    return data;
  } catch (error) {
    console.error("Error in saveSymptomLog:", error);
    toast({
      title: "Something went wrong",
      description: "Could not save your symptom data. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Get user's symptom history
export const getUserSymptomHistory = async (userId: string): Promise<SymptomLog[]> => {
  try {
    console.log('Fetching symptom history for user:', userId);
    
    const { data, error } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', userId)
      .order('log_date', { ascending: false });

    if (error) {
      console.error('Error fetching symptom history:', error);
      toast({
        title: "Error fetching symptom history",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getUserSymptomHistory:", error);
    return [];
  }
};

// Get symptom log for a specific date
export const getSymptomLogByDate = async (userId: string, date: string): Promise<SymptomLog | null> => {
  try {
    const { data, error } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('log_date', date)
      .maybeSingle();

    if (error) {
      console.error('Error fetching symptom log by date:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getSymptomLogByDate:", error);
    return null;
  }
};

// Helper function to format date for database
export const formatDateForDB = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper function to get symptom trends
export const getSymptomTrends = (logs: SymptomLog[]) => {
  const trends = {
    mostCommonSymptoms: {} as Record<string, number>,
    averagePainLevel: 0,
    averageEnergyLevel: 0,
    averageSleepHours: 0,
    moodDistribution: {} as Record<string, number>,
  };

  if (logs.length === 0) return trends;

  // Calculate most common symptoms
  logs.forEach(log => {
    if (log.physical_symptoms) {
      log.physical_symptoms.forEach(symptom => {
        trends.mostCommonSymptoms[symptom] = (trends.mostCommonSymptoms[symptom] || 0) + 1;
      });
    }
    
    if (log.mood) {
      trends.moodDistribution[log.mood] = (trends.moodDistribution[log.mood] || 0) + 1;
    }
  });

  // Calculate averages
  const logsWithPain = logs.filter(log => log.pain_level !== undefined && log.pain_level !== null);
  const logsWithEnergy = logs.filter(log => log.energy_level !== undefined && log.energy_level !== null);
  const logsWithSleep = logs.filter(log => log.sleep_hours !== undefined && log.sleep_hours !== null);

  trends.averagePainLevel = logsWithPain.length > 0 
    ? logsWithPain.reduce((sum, log) => sum + (log.pain_level || 0), 0) / logsWithPain.length 
    : 0;
    
  trends.averageEnergyLevel = logsWithEnergy.length > 0
    ? logsWithEnergy.reduce((sum, log) => sum + (log.energy_level || 0), 0) / logsWithEnergy.length
    : 0;
    
  trends.averageSleepHours = logsWithSleep.length > 0
    ? logsWithSleep.reduce((sum, log) => sum + (log.sleep_hours || 0), 0) / logsWithSleep.length
    : 0;

  return trends;
};
