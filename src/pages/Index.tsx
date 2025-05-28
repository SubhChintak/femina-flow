
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CycleChart from "@/components/CycleChart";
import Calendar from "@/components/Calendar";
import NavBar from "@/components/NavBar";
import InsightCard from "@/components/InsightCard";
import { Calendar as CalendarIcon, Activity, Baby, Lightbulb, ArrowRight, Heart, Eye, Shield, Users, Sparkles, TrendingUp,CalendarDays } from "lucide-react";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from a database or state management
  const currentCycle = {
    currentDay: 15,
    totalDays: 28,
    periodStart: 1,
    periodEnd: 5,
    ovulationDay: 14,
  };
  
  // Mock period dates (for calendar)
  const today = new Date();
  const periodDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - currentCycle.currentDay + 1 + i);
    return date;
  });
  
  // Mock ovulation dates
  const ovulationDate = new Date(today);
  ovulationDate.setDate(today.getDate() - currentCycle.currentDay + currentCycle.ovulationDay);
  const ovulationDates = [ovulationDate];

  const quickActions = [
    {
      title: "Log Period",
      icon: "📅",
      description: "Track your cycle",
      gradient: "from-pink-400 via-rose-400 to-pink-500",
      route: "/period-tracker",
      delay: "delay-100"
    },
    {
      title: "Track Symptoms",
      icon: "🩺",
      description: "Monitor your health",
      gradient: "from-purple-400 via-pink-400 to-purple-500",
      route: "/symptoms",
      delay: "delay-200"
    },
    {
      title: "Pregnancy",
      icon: "👶",
      description: "Journey & fertility",
      gradient: "from-rose-400 via-pink-400 to-rose-500",
      route: "/pregnancy",
      delay: "delay-300"
    },
    {
      title: "Health Insights",
      icon: "💡",
      description: "Personalized tips",
      gradient: "from-fuchsia-400 via-pink-400 to-fuchsia-500",
      route: "/insights",
      delay: "delay-500"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Personalized Tracking",
      description: "Smart cycle predictions based on your unique patterns",
      delay: "delay-100"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and secure",
      delay: "delay-300"
    },
    {
      icon: Eye,
      title: "Safe Sex Days",
      description: "Intelligent insights for safe intimacy",
      delay: "delay-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-fuchsia-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <NavBar />
      
      <main className="container mx-auto px-4 py-8 space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 py-12 animate-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-full px-6 py-2 border border-pink-200/50">
              <Sparkles className="text-pink-500 animate-pulse" size={20} />
              <span className="text-pink-700 font-medium font-lora">Welcome to your wellness journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent leading-tight animate-fade-in font-playfair">
              Femina<span className="text-pink-500">Flow</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in font-lora" style={{ animationDelay: '0.3s' }}>
              Your intelligent companion for menstrual health, fertility tracking, and wellness insights. 
              Empowering women with personalized care and expert guidance.
            </p>
          </div>
          
          {/* Current Cycle Status */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl border border-pink-100 animate-fade-in hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.6s' }}>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 text-pink-600 mb-2">
                <TrendingUp size={20} />
                <p className="text-sm uppercase tracking-wide font-semibold font-opensans">Current Cycle</p>
              </div>
              <div className="relative">
                <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-playfair">
                  Day {currentCycle.currentDay}
                </p>
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-lg -z-10"></div>
              </div>
              <p className="text-gray-600 font-medium font-lora">of {currentCycle.totalDays} days</p>
            </div>
          </div>
        </div>

        {/* Cycle Chart Section */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-playfair">
              Your Cycle Overview
            </h2>
            <p className="text-gray-600 text-lg font-lora">Track your menstrual cycle with beautiful visual insights</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100 hover:shadow-3xl transition-all duration-500">
            <CycleChart {...currentCycle} />
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Calendar Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3 font-playfair">
                  <div className="p-2 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                    <CalendarIcon className="text-pink-600" size={28} />
                  </div>
                  Cycle Calendar
                </h2>
                <p className="text-gray-600 mt-2 text-lg font-lora">Visualize your cycle patterns with elegance</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/period-tracker")}
                className="text-pink-700 hover:text-pink-800 hover:bg-pink-100 group transition-all duration-300 font-opensans"
              >
                View Details
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </Button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100 hover:shadow-3xl transition-all duration-500">
              <Calendar periodDates={periodDates} ovulationDates={ovulationDates} />
            </div>
          </div>
          
          {/* Quick Actions Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3 font-playfair">
                <div className="p-2 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                  <Activity className="text-pink-600" size={28} />
                </div>
                Quick Actions
              </h2>
              <p className="text-gray-600 mt-2 text-lg font-lora">Manage your health in one beautiful tap</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(action.route)}
                  className={`flex flex-col items-center justify-center h-36 bg-gradient-to-br ${action.gradient} hover:scale-110 transition-all duration-500 text-white rounded-3xl shadow-2xl border-0 group animate-fade-in ${action.delay} hover:shadow-3xl hover:rotate-1`}
                >
                  {/* <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{action.icon}</span> */}
                  <span className="font-bold text-lg md:text-3xl font-playfair">{action.title}</span>
                  <span className="text-sm opacity-90 font-opensans">{action.description}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-10 animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-playfair">
              Why Choose FeminaFlow?
            </h2>
            <p className="text-gray-600 text-lg font-lora">Empowering women with intelligent health insights and beautiful design</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100 hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in ${feature.delay} group`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-pink-600" size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 font-lora">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-opensans">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Health Insights Section */}
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '2.1s' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3 font-playfair">
                <div className="p-2 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                  <Lightbulb className="text-pink-600" size={28} />
                </div>
                Health Insights
              </h2>
              <p className="text-gray-600 mt-2 text-lg font-lora">Personalized recommendations crafted just for you</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/insights")}
              className="text-pink-700 hover:text-pink-800 hover:bg-pink-100 group transition-all duration-300 font-opensans"
            >
              View All
              <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in delay-100">
              <InsightCard
                title="Cycle Health"
                description="Today's insight"
                content="Your cycle has been regular for the past 3 months. Regular cycles often indicate good hormonal balance."
              />
            </div>
            
            <div className="animate-fade-in delay-300">
              <InsightCard
                title="Nutrition Tip"
                description="Iron-rich foods"
                content="Consider adding more iron-rich foods like spinach and lentils to your diet during your period to replenish lost iron."
              />
            </div>
            
            <div className="animate-fade-in delay-500">
              <InsightCard
                title="Exercise Recommendation"
                description="For your current phase"
                content="Light cardio and stretching are ideal during the follicular phase to boost energy and mood."
              />
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default Index;
