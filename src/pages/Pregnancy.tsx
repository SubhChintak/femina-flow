
import NavBar from "@/components/NavBar";
import PregnancyTracker from "@/components/PregnancyTracker";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pregnancy = () => {
  return (
    <div className="min-h-screen bg-femina-50">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-femina-900">Pregnancy Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PregnancyTracker />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Pregnancy Resources</h2>
              <Card className="p-5">
                <Tabs defaultValue="first">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="first">First Trimester</TabsTrigger>
                    <TabsTrigger value="second">Second Trimester</TabsTrigger>
                    <TabsTrigger value="third">Third Trimester</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="first">
                    <div className="space-y-4">
                      <h3 className="font-medium">First Trimester (Weeks 1-12)</h3>
                      <p className="text-sm text-gray-600">
                        During the first trimester, your baby's body structure and organ systems develop. 
                        Most miscarriages and birth defects occur during this period.
                      </p>
                      
                      <h4 className="font-medium text-sm mt-3">What to Expect</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Morning sickness</li>
                        <li>Fatigue</li>
                        <li>Food cravings or aversions</li>
                        <li>Mood swings</li>
                        <li>Frequent urination</li>
                      </ul>
                      
                      <h4 className="font-medium text-sm mt-3">Self-Care Tips</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Take prenatal vitamins</li>
                        <li>Stay hydrated</li>
                        <li>Get plenty of rest</li>
                        <li>Avoid alcohol, tobacco, and excessive caffeine</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="second">
                    <div className="space-y-4">
                      <h3 className="font-medium">Second Trimester (Weeks 13-26)</h3>
                      <p className="text-sm text-gray-600">
                        The second trimester is often called the "golden period" of pregnancy. 
                        Many women find that symptoms like nausea and fatigue improve.
                      </p>
                      
                      <h4 className="font-medium text-sm mt-3">What to Expect</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Baby movements ("quickening")</li>
                        <li>Growing belly</li>
                        <li>Increased appetite</li>
                        <li>Nasal congestion</li>
                        <li>Skin changes</li>
                      </ul>
                      
                      <h4 className="font-medium text-sm mt-3">Self-Care Tips</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Start pregnancy exercises</li>
                        <li>Use moisturizer to prevent stretch marks</li>
                        <li>Sleep on your side with a pregnancy pillow</li>
                        <li>Prepare for the baby's arrival</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="third">
                    <div className="space-y-4">
                      <h3 className="font-medium">Third Trimester (Weeks 27-40+)</h3>
                      <p className="text-sm text-gray-600">
                        Your baby continues to grow and mature. You may feel more uncomfortable 
                        as your baby and uterus grow larger.
                      </p>
                      
                      <h4 className="font-medium text-sm mt-3">What to Expect</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Shortness of breath</li>
                        <li>Backaches</li>
                        <li>Braxton Hicks contractions</li>
                        <li>Swollen ankles and feet</li>
                        <li>Difficulty sleeping</li>
                      </ul>
                      
                      <h4 className="font-medium text-sm mt-3">Self-Care Tips</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                        <li>Practice breathing exercises for labor</li>
                        <li>Keep track of baby's movements</li>
                        <li>Prepare a hospital bag</li>
                        <li>Learn signs of labor</li>
                        <li>Rest and conserve energy</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Pregnancy Checklist</h2>
            <Card className="p-5">
              <h3 className="font-medium mb-3">First Trimester Checklist</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="first-checkup" className="mr-2" />
                  <label htmlFor="first-checkup" className="text-sm">Schedule first prenatal checkup</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="prenatal-vitamins" className="mr-2" />
                  <label htmlFor="prenatal-vitamins" className="text-sm">Start taking prenatal vitamins</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="quit-habits" className="mr-2" />
                  <label htmlFor="quit-habits" className="text-sm">Quit smoking and alcohol</label>
                </div>
              </div>
              
              <h3 className="font-medium mb-3">Second Trimester Checklist</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="anatomy-scan" className="mr-2" />
                  <label htmlFor="anatomy-scan" className="text-sm">Schedule anatomy scan (18-22 weeks)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="baby-registry" className="mr-2" />
                  <label htmlFor="baby-registry" className="text-sm">Start baby registry</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="nursery-plan" className="mr-2" />
                  <label htmlFor="nursery-plan" className="text-sm">Begin planning nursery</label>
                </div>
              </div>
              
              <h3 className="font-medium mb-3">Third Trimester Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="birth-plan" className="mr-2" />
                  <label htmlFor="birth-plan" className="text-sm">Create birth plan</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="hospital-bag" className="mr-2" />
                  <label htmlFor="hospital-bag" className="text-sm">Pack hospital bag</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="childbirth-class" className="mr-2" />
                  <label htmlFor="childbirth-class" className="text-sm">Take childbirth classes</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="pedatrician" className="mr-2" />
                  <label htmlFor="pedatrician" className="text-sm">Choose a pediatrician</label>
                </div>
              </div>
            </Card>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
              <Card className="p-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">When will I feel my baby move?</h3>
                    <p className="text-sm text-gray-600">
                      Most women feel the baby's first movements (quickening) between weeks 18-25, though some may notice them earlier.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">How much weight should I gain?</h3>
                    <p className="text-sm text-gray-600">
                      The recommended weight gain depends on your pre-pregnancy BMI. Generally, it's 25-35 pounds for women with a normal BMI.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Is it safe to exercise during pregnancy?</h3>
                    <p className="text-sm text-gray-600">
                      Yes, moderate exercise is generally safe and beneficial. Walking, swimming, and prenatal yoga are excellent options.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pregnancy;
