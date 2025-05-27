
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  description: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

const InsightCard = ({ title, description, content, icon, className = "" }: InsightCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-femina-500/90 to-femina-700 text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-white/80">{description}</CardDescription>
          </div>
          {icon && <div className="text-white/90">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
