
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import SymptomTracker from "@/components/SymptomTracker";
import SymptomChart from "@/components/SymptomChart";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { getUserSymptomHistory, getSymptomTrends, SymptomLog } from "@/services/symptomService";
import { format, parseISO } from "date-fns";

const Symptoms = () => {
  const { user } = useUser();
  const [symptomHistory, setSymptomHistory] = useState<SymptomLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSymptomHistory();
    }
  }, [user]);

  const loadSymptomHistory = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const history = await getUserSymptomHistory(user.id);
      setSymptomHistory(history);
    } catch (error) {
      console.error("Error loading symptom history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render symptom tags
  const renderSymptomTags = (symptoms: string[]) => {
    return symptoms.map((symptom) => (
      <span
        key={symptom}
        className="inline-block bg-femina-100 text-femina-800 px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1 font-opensans"
      >
        {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace('_', ' ')}
      </span>
    ));
  };

  const trends = getSymptomTrends(symptomHistory);
  const recentHistory = symptomHistory.slice(0, 10);

  if (!user) {
    return (
      <div className="min-h-screen bg-femina-50">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 font-playfair">Please log in to access symptom tracking</h1>
            <button 
              onClick={() => window.location.href = '/auth'}
              className="bg-femina-500 text-white px-6 py-2 rounded-lg hover:bg-femina-600 font-opensans"
            >
              Go to Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-femina-50">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-femina-900 font-playfair">Symptom Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 font-lora">Log Today's Symptoms</h2>
              <SymptomTracker />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 font-lora">Symptom Trends</h2>
              <SymptomChart data={symptomHistory} />
            </div>

            {!isLoading && symptomHistory.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 font-lora">Insights</h2>
                <Card className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2 font-lora">Most Common Symptoms</h3>
                      <div className="space-y-1">
                        {Object.entries(trends.mostCommonSymptoms)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 3)
                          .map(([symptom, count]) => (
                            <div key={symptom} className="text-sm font-opensans">
                              {symptom.replace('_', ' ')}: {count} times
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2 font-lora">Averages</h3>
                      <div className="space-y-1 text-sm font-opensans">
                        <div>Pain Level: {trends.averagePainLevel.toFixed(1)}/10</div>
                        <div>Energy Level: {trends.averageEnergyLevel.toFixed(1)}/4</div>
                        <div>Sleep: {trends.averageSleepHours.toFixed(1)}h</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 font-lora">Recent Entries</h2>
            <Card className="p-5">
              {isLoading ? (
                <div className="text-center text-gray-500 font-opensans">Loading...</div>
              ) : recentHistory.length === 0 ? (
                <div className="text-center text-gray-500 font-opensans">
                  No symptom entries yet. Start tracking to see your history!
                </div>
              ) : (
                <div className="space-y-4">
                  {recentHistory.map((entry) => (
                    <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium font-lora">
                          {format(parseISO(entry.log_date), 'MMM dd, yyyy')}
                        </span>
                        {entry.mood && (
                          <span className="text-sm bg-femina-100 text-femina-800 px-2 py-1 rounded-full font-opensans">
                            {entry.mood}
                          </span>
                        )}
                      </div>
                      
                      {entry.physical_symptoms && entry.physical_symptoms.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1 font-opensans">Symptoms</p>
                          <div className="flex flex-wrap">
                            {renderSymptomTags(entry.physical_symptoms)}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500 font-opensans">Pain Level</p>
                          <p className="font-medium font-opensans">{entry.pain_level || 0}/10</p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-opensans">Sleep</p>
                          <p className="font-medium font-opensans">{entry.sleep_hours || 0}h</p>
                        </div>
                      </div>

                      {entry.notes && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-gray-600 font-opensans">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Symptoms;
