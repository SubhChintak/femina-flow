
import NavBar from "@/components/NavBar";
import HealthInsights from "@/components/HealthInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Apple, Dumbbell, Brain, Book } from "lucide-react";

const Insights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-femina-50 via-white to-blush-50">
      <NavBar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-femina-900 bg-gradient-to-r from-femina-700 to-femina-500 bg-clip-text text-transparent">
            Health Insights & Wellness
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover personalized insights about your menstrual health and optimize your wellness journey
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto p-1 bg-white/60 backdrop-blur-sm border border-femina-100">
            <TabsTrigger 
              value="personal" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-femina-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cycle" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-femina-500 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Cycle</span>
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-femina-500 data-[state=active]:text-white"
            >
              <Apple className="h-4 w-4" />
              <span className="hidden sm:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fitness" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-femina-500 data-[state=active]:text-white"
            >
              <Dumbbell className="h-4 w-4" />
              <span className="hidden sm:inline">Fitness</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mental" 
              className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-femina-500 data-[state=active]:text-white"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Mental</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            <HealthInsights />
          </TabsContent>
          
          <TabsContent value="cycle" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-femina-500 to-femina-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Understanding Your Menstrual Cycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      Your menstrual cycle is more than just your period. It's a complex interplay of hormones that affects your body in many ways.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-femina-900">The Four Phases of Your Cycle</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-blush-100 to-blush-50 rounded-xl border border-blush-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-blush-500 rounded-full"></div>
                            <h4 className="font-semibold text-blush-900">Menstrual Phase</h4>
                            <Badge variant="outline" className="text-xs">Days 1-5</Badge>
                          </div>
                          <p className="text-sm text-blush-700">
                            This phase begins on the first day of your period and lasts until the bleeding stops, typically 3-7 days.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-femina-100 to-femina-50 rounded-xl border border-femina-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-femina-500 rounded-full"></div>
                            <h4 className="font-semibold text-femina-900">Follicular Phase</h4>
                            <Badge variant="outline" className="text-xs">Days 1-13</Badge>
                          </div>
                          <p className="text-sm text-femina-700">
                            This phase overlaps with the menstrual phase and continues until ovulation. The follicle containing the egg matures during this time.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl border border-sky-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                            <h4 className="font-semibold text-sky-900">Ovulation Phase</h4>
                            <Badge variant="outline" className="text-xs">Day 14</Badge>
                          </div>
                          <p className="text-sm text-sky-700">
                            The mature follicle releases an egg, which can then be fertilized. This usually occurs mid-cycle.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <h4 className="font-semibold text-purple-900">Luteal Phase</h4>
                            <Badge variant="outline" className="text-xs">Days 15-28</Badge>
                          </div>
                          <p className="text-sm text-purple-700">
                            After ovulation, the follicle transforms into the corpus luteum, which produces progesterone to prepare for possible pregnancy.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-femina-900">What Affects Your Cycle</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-femina-400 rounded-full"></div>
                            Stress levels
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-femina-400 rounded-full"></div>
                            Diet and nutrition
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-femina-400 rounded-full"></div>
                            Exercise intensity
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-femina-400 rounded-full"></div>
                            Sleep patterns
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-femina-400 rounded-full"></div>
                            Hormonal changes
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-femina-900">Signs of a Healthy Cycle</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Regular periods (21-35 days)
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Manageable symptoms
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Moderate bleeding
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Period duration 3-7 days
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            Gradual flow changes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-femina-900">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-femina-50 to-femina-100 rounded-lg">
                      <h4 className="font-medium mb-2 text-femina-900">Did You Know?</h4>
                      <p className="text-sm text-femina-700">
                        Only 10-15% of people have exactly 28-day cycles. Anywhere from 21-35 days is normal.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blush-50 to-blush-100 rounded-lg">
                      <h4 className="font-medium mb-2 text-blush-900">When to See a Doctor</h4>
                      <ul className="text-sm text-blush-700 space-y-1">
                        <li>• Periods longer than 7 days</li>
                        <li>• Extremely heavy flow</li>
                        <li>• Severe pain</li>
                        <li>• Irregular cycles</li>
                        <li>• Sudden cycle changes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  Nutrition Through Your Cycle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your nutritional needs change throughout your menstrual cycle. Eating in sync with your cycle can help manage symptoms and support overall health.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-gradient-to-br from-blush-100 to-blush-50 rounded-xl border border-blush-200">
                    <h4 className="font-semibold mb-3 text-blush-900">During Menstruation</h4>
                    <p className="text-sm text-blush-700 mb-3">
                      Focus on iron-rich foods to replenish what's lost through bleeding.
                    </p>
                    <ul className="space-y-2 text-sm text-blush-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Leafy greens (spinach, kale)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Lean red meat
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Lentils and beans
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Iron-fortified cereals
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-femina-100 to-femina-50 rounded-xl border border-femina-200">
                    <h4 className="font-semibold mb-3 text-femina-900">Follicular Phase</h4>
                    <p className="text-sm text-femina-700 mb-3">
                      Support estrogen production and energy levels.
                    </p>
                    <ul className="space-y-2 text-sm text-femina-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Fresh fruits and vegetables
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Fermented foods
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Sprouted grains
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Healthy fats
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl border border-sky-200">
                    <h4 className="font-semibold mb-3 text-sky-900">Ovulation</h4>
                    <p className="text-sm text-sky-700 mb-3">
                      Support hormone balance and egg health.
                    </p>
                    <ul className="space-y-2 text-sm text-sky-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Zinc-rich foods
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Antioxidant-rich foods
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Omega-3 fatty acids
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Raw vegetables and fruits
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-900">Luteal Phase</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Reduce inflammation and support serotonin production.
                    </p>
                    <ul className="space-y-2 text-sm text-purple-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Complex carbohydrates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Calcium-rich foods
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Magnesium-rich foods
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Vitamin B6 foods
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fitness" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Cycle-Synced Fitness
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Aligning your workouts with your menstrual cycle phases can optimize results and make exercise feel more intuitive.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-5 bg-gradient-to-br from-blush-100 to-blush-50 rounded-xl border border-blush-200">
                    <h4 className="font-semibold mb-3 text-blush-900">Menstrual Phase Workouts</h4>
                    <p className="text-sm text-blush-700 mb-3">
                      Energy is typically lower during this phase. Focus on:
                    </p>
                    <ul className="space-y-2 text-sm text-blush-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Gentle walking
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Light yoga or stretching
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Pilates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Restorative exercises
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-femina-100 to-femina-50 rounded-xl border border-femina-200">
                    <h4 className="font-semibold mb-3 text-femina-900">Follicular Phase Workouts</h4>
                    <p className="text-sm text-femina-700 mb-3">
                      Energy levels rise with estrogen. Great time for:
                    </p>
                    <ul className="space-y-2 text-sm text-femina-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        High-intensity interval training
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        New workout classes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Strength training
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Cardio sessions
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl border border-sky-200">
                    <h4 className="font-semibold mb-3 text-sky-900">Ovulation Phase Workouts</h4>
                    <p className="text-sm text-sky-700 mb-3">
                      Energy and confidence peak. Excellent for:
                    </p>
                    <ul className="space-y-2 text-sm text-sky-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Strength training with heavier weights
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        High-intensity workouts
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Running or sprinting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Group fitness classes
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-900">Luteal Phase Workouts</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Energy begins to decline. Focus on:
                    </p>
                    <ul className="space-y-2 text-sm text-purple-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Moderate-intensity strength training
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Pilates and barre
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Swimming
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Brisk walking
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-5 bg-gradient-to-r from-femina-50 to-blush-50 border border-femina-200 rounded-xl">
                  <h4 className="font-semibold mb-3 text-femina-900">Exercise Benefits for Menstrual Health</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-femina-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Reduces period pain and cramping
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Improves mood and reduces PMS
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Helps regulate cycles
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-femina-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Improves circulation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Reduces bloating
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Manages PCOS symptoms
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mental" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Mental Wellbeing & Your Cycle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your hormones can significantly impact your mood and mental state throughout your cycle. Understanding these patterns can help you manage your emotional wellbeing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-5 bg-gradient-to-br from-blush-100 to-blush-50 rounded-xl border border-blush-200">
                    <h4 className="font-semibold mb-3 text-blush-900">Menstrual Phase</h4>
                    <p className="text-sm text-blush-700 mb-3">
                      Mood tendencies: Reflective, introspective
                    </p>
                    <ul className="space-y-2 text-sm text-blush-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Practice gentle self-care
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Journaling can be powerful
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Rest and process emotions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blush-500 rounded-full"></div>
                        Avoid major decisions
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-femina-100 to-femina-50 rounded-xl border border-femina-200">
                    <h4 className="font-semibold mb-3 text-femina-900">Follicular Phase</h4>
                    <p className="text-sm text-femina-700 mb-3">
                      Mood tendencies: Optimistic, energetic, outgoing
                    </p>
                    <ul className="space-y-2 text-sm text-femina-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Plan social activities
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Take on new projects
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Schedule important meetings
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-femina-500 rounded-full"></div>
                        Good time for problem-solving
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-sky-100 to-sky-50 rounded-xl border border-sky-200">
                    <h4 className="font-semibold mb-3 text-sky-900">Ovulation Phase</h4>
                    <p className="text-sm text-sky-700 mb-3">
                      Mood tendencies: Confident, verbal, magnetic
                    </p>
                    <ul className="space-y-2 text-sm text-sky-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Excellent for public speaking
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Have important conversations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Network and socialize
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                        Express yourself creatively
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-900">Luteal Phase</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Mood tendencies: Detail-oriented, potentially irritable
                    </p>
                    <ul className="space-y-2 text-sm text-purple-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Focus on detail-oriented tasks
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Practice stress management
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Prioritize relaxation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        Be gentle with yourself
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                  <h4 className="font-semibold mb-3 text-indigo-900">Cycle-Synced Self-Care Practices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-indigo-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Meditation and breathwork
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Journaling about cycle patterns
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Adapting social plans to energy
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-indigo-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Setting boundaries when needed
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Sleep hygiene throughout month
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Hormonal awareness practices
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
