import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card1";
import { BarChart, BookOpen, MessageSquare, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AuthorDashboard = () => {
  const dashboardData = [
    {
      title: "Followers",
      value: 0,
      description: "Users following you",
      icon: Users,
      link: "",
    },
    {
      title: "Novels",
      value: 0,
      description: "Your novels",
      icon: BookOpen,
      link: "/admin/novels",
    },
    {
      title: "Reviews",
      value: 0,
      description: "Average rating and reviews",
      icon: Star,
      link: "/author/reviews",
    },
    {
      title: "Views",
      value: 0,
      description: "Total novel views",
      icon: BarChart,
      link: "/author/stats",
    },
    {
      title: "Comments",
      value: 0,
      description: "Reader feedback",
      icon: MessageSquare,
      link: "/author/comments",
    },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dashboardData.map((item) => (
          <Link to={item.link} key={item.title}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AuthorDashboard;
