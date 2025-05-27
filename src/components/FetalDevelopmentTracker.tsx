
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby } from "lucide-react";

interface FetalDevelopmentTrackerProps {
  weeks: number;
  days: number;
}

const FetalDevelopmentTracker = ({ weeks, days }: FetalDevelopmentTrackerProps) => {
  const getWeeklyDevelopment = (week: number) => {
    const developments = {
      4: {
        size: "Poppy seed (2mm)",
        development: "Neural tube forms, heart begins to beat",
        image: "🌱"
      },
      8: {
        size: "Raspberry (1.6cm)",
        development: "All major organs forming, limbs developing",
        image: "🫐"
      },
      12: {
        size: "Lime (6cm)",
        development: "Reflexes developing, kidneys producing urine",
        image: "🥝"
      },
      16: {
        size: "Avocado (11cm)",
        development: "Sex can be determined, hair and nails growing",
        image: "🥑"
      },
      20: {
        size: "Banana (16cm)",
        development: "Hearing developed, movements felt by mom",
        image: "🍌"
      },
      24: {
        size: "Corn (30cm)",
        development: "Lungs developing, brain growing rapidly",
        image: "🌽"
      },
      28: {
        size: "Eggplant (37cm)",
        development: "Eyes can open, fat accumulating",
        image: "🍆"
      },
      32: {
        size: "Coconut (42cm)",
        development: "Bones hardening, immune system developing",
        image: "🥥"
      },
      36: {
        size: "Lettuce (47cm)",
        development: "Lungs nearly mature, gaining weight",
        image: "🥬"
      },
      40: {
        size: "Watermelon (51cm)",
        development: "Ready for birth, fully developed",
        image: "🍉"
      }
    };

    // Find the closest week
    const availableWeeks = Object.keys(developments).map(Number).sort((a, b) => a - b);
    const closestWeek = availableWeeks.reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );

    return developments[closestWeek as keyof typeof developments] || developments[4];
  };

  const getTrimesterInfo = (week: number) => {
    if (week <= 12) {
      return {
        trimester: "First",
        description: "Critical organ development period",
        focus: "Taking prenatal vitamins, avoiding harmful substances",
        color: "bg-blue-100 text-blue-700"
      };
    } else if (week <= 27) {
      return {
        trimester: "Second",
        description: "Often called the 'golden period'",
        focus: "Regular exercise, monitoring baby movements",
        color: "bg-green-100 text-green-700"
      };
    } else {
      return {
        trimester: "Third",
        description: "Final preparation for birth",
        focus: "Birth preparation, monitoring contractions",
        color: "bg-purple-100 text-purple-700"
      };
    }
  };

  const development = getWeeklyDevelopment(weeks);
  const trimesterInfo = getTrimesterInfo(weeks);
  const progressPercentage = Math.min((weeks / 40) * 100, 100);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Baby className="h-5 w-5 text-femina-600" />
        <h2 className="text-xl font-semibold">Fetal Development</h2>
        <Badge className={trimesterInfo.color}>
          {trimesterInfo.trimester} Trimester
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-2">{development.image}</div>
            <h3 className="text-lg font-semibold">Week {weeks}, Day {days}</h3>
            <p className="text-sm text-gray-600">Size: {development.size}</p>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pregnancy Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="text-center p-4 bg-femina-50 rounded-lg">
            <h4 className="font-medium mb-2">This Week's Development</h4>
            <p className="text-sm text-gray-700">{development.development}</p>
          </div>
        </div>

        <div>
          <Tabs defaultValue="development" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="development" className="space-y-3">
              <h4 className="font-medium">Key Developments</h4>
              {weeks <= 12 ? (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Neural tube and brain formation</li>
                  <li>• Heart starts beating</li>
                  <li>• Limb buds appear</li>
                  <li>• Major organs begin forming</li>
                </ul>
              ) : weeks <= 27 ? (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Rapid brain development</li>
                  <li>• Movement becomes noticeable</li>
                  <li>• Hearing develops</li>
                  <li>• Sex organs visible on ultrasound</li>
                </ul>
              ) : (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Lungs maturing</li>
                  <li>• Weight gain accelerates</li>
                  <li>• Brain development continues</li>
                  <li>• Preparing for birth</li>
                </ul>
              )}
            </TabsContent>
            
            <TabsContent value="symptoms" className="space-y-3">
              <h4 className="font-medium">Common Symptoms</h4>
              {weeks <= 12 ? (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Morning sickness</li>
                  <li>• Fatigue</li>
                  <li>• Breast tenderness</li>
                  <li>• Frequent urination</li>
                </ul>
              ) : weeks <= 27 ? (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Increased energy</li>
                  <li>• Growing belly</li>
                  <li>• Baby movements</li>
                  <li>• Skin changes</li>
                </ul>
              ) : (
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Shortness of breath</li>
                  <li>• Back pain</li>
                  <li>• Swelling</li>
                  <li>• Braxton Hicks contractions</li>
                </ul>
              )}
            </TabsContent>
            
            <TabsContent value="tips" className="space-y-3">
              <h4 className="font-medium">Care Tips</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Focus:</strong> {trimesterInfo.focus}</p>
                <ul className="space-y-1">
                  <li>• Attend regular prenatal appointments</li>
                  <li>• Maintain a healthy diet</li>
                  <li>• Stay hydrated</li>
                  <li>• Get adequate rest</li>
                  <li>• Monitor baby's movements</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
};

export default FetalDevelopmentTracker;
