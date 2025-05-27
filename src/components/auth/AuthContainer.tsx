
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleSignupSuccess = () => {
    setActiveTab("login");
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-femina-700">
            Welcome to FeminaFlow
          </CardTitle>
          <CardDescription>
            Track your health journey with personalized insights
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignupForm onSuccess={handleSignupSuccess} />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            By signing up, you agree to our <a href="#" className="underline text-femina-700">Terms of Service</a> and <a href="#" className="underline text-femina-700">Privacy Policy</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthContainer;
