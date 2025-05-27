
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getUserPeriodHistory } from "@/services/periodService";
import { analyzeCycleHealth, getCurrentCyclePhase, HealthInsight, CycleAnalysis } from "@/services/healthInsightsService";
import { AlertTriangle, CheckCircle, Info, Heart, Activity, TrendingUp } from "lucide-react";

const HealthInsights = () => {
  const { user } = useUser();
  const [cycleAnalysis, setCycleAnalysis] = useState<CycleAnalysis | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>('menstrual');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndAnalyzeData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const periodHistory = await getUserPeriodHistory(user.id);
      const analysis = analyzeCycleHealth(periodHistory);
      setCycleAnalysis(analysis);
      
      if (periodHistory.length > 0) {
        const phase = getCurrentCyclePhase(periodHistory[0].start_date, analysis.averageCycleLength);
        setCurrentPhase(phase);
      }
      
      setIsLoading(false);
    };

    fetchAndAnalyzeData();
  }, [user]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getPhaseContent = (phase: string) => {
    const phaseContent = {
      menstrual: {
        title: "Menstrual Phase",
        description: "Your body is shedding the uterine lining. This is a time for rest and self-care.",
        color: "blush",
        tips: [
          "Stay hydrated and get plenty of rest",
          "Use heat therapy for cramps",
          "Eat iron-rich foods to replenish lost nutrients",
          "Practice gentle yoga or light stretching"
        ]
      },
      follicular: {
        title: "Follicular Phase",
        description: "Estrogen levels are rising, and you may feel more energetic and optimistic.",
        color: "femina",
        tips: [
          "Take advantage of increased energy for new projects",
          "Focus on strength training and cardio",
          "Eat fresh, light foods",
          "Schedule important meetings or decisions"
        ]
      },
      ovulation: {
        title: "Ovulation Phase",
        description: "You're at your most fertile. Energy and confidence are typically at their peak.",
        color: "sky",
        tips: [
          "This is your peak fertility window",
          "High-intensity workouts are great now",
          "Social activities and communication excel",
          "Consider scheduling important presentations"
        ]
      },
      luteal: {
        title: "Luteal Phase",
        description: "Progesterone is dominant. You may feel more introspective and detail-oriented.",
        color: "purple",
        tips: [
          "Focus on detail-oriented tasks and organization",
          "Practice stress management techniques",
          "Eat complex carbohydrates to support mood",
          "Prepare for your upcoming period"
        ]
      }
    };

    return phaseContent[phase as keyof typeof phaseContent] || phaseContent.menstrual;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!cycleAnalysis) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">No Data Available</h3>
            <p className="text-gray-500">Please log some periods to get personalized health insights.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const phaseContent = getPhaseContent(currentPhase);

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-sm bg-gradient-to-br from-femina-500 to-femina-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-femina-100 text-sm font-medium">Average Cycle</p>
                <p className="text-3xl font-bold">{cycleAnalysis.averageCycleLength}</p>
                <p className="text-femina-100 text-sm">days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-femina-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Cycle Status</p>
                <p className="text-xl font-bold">
                  {cycleAnalysis.isRegular ? "Regular" : "Irregular"}
                </p>
                <p className="text-emerald-100 text-sm">
                  {cycleAnalysis.isRegular ? "Healthy pattern" : "Needs attention"}
                </p>
              </div>
              <Heart className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className={`backdrop-blur-sm bg-gradient-to-br from-${phaseContent.color}-500 to-${phaseContent.color}-600 text-white border-0 shadow-lg`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${phaseContent.color}-100 text-sm font-medium`}>Current Phase</p>
                <p className="text-xl font-bold capitalize">{currentPhase}</p>
                <p className={`text-${phaseContent.color}-100 text-sm`}>
                  {phaseContent.title.replace(' Phase', '')}
                </p>
              </div>
              <Activity className={`h-8 w-8 text-${phaseContent.color}-200`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-femina-900">
            <Heart className="h-5 w-5 text-femina-500" />
            Health Analysis & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cycleAnalysis.insights.map((insight) => (
            <Alert key={insight.id} variant={insight.type === 'warning' ? 'destructive' : 'default'} className="border-l-4">
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <AlertTitle className="flex items-center gap-2 mb-2">
                    {insight.title}
                    <Badge variant={getSeverityColor(insight.severity) as any} className="text-xs">
                      {insight.severity}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="mb-3">
                    {insight.description}
                  </AlertDescription>
                  <div className="p-3 bg-gray-50 rounded-lg border-l-2 border-gray-300">
                    <p className="text-sm font-medium text-gray-700 mb-1">💡 Recommendation:</p>
                    <p className="text-sm text-gray-600">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Current Phase Guide */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader className={`bg-gradient-to-r from-${phaseContent.color}-500 to-${phaseContent.color}-600 text-white rounded-t-lg`}>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {phaseContent.title} Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            {phaseContent.description}
          </p>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg text-femina-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-femina-500" />
              Wellness Tips for This Phase
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phaseContent.tips.map((tip, index) => (
                <div key={index} className={`p-4 bg-gradient-to-br from-${phaseContent.color}-50 to-${phaseContent.color}-100 rounded-lg border border-${phaseContent.color}-200`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 bg-${phaseContent.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                    <p className={`text-sm text-${phaseContent.color}-800 leading-relaxed`}>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthInsights;
