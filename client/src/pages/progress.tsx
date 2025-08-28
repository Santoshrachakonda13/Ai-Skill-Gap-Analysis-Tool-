import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { StudentWithStats } from "@/types";

export default function ProgressTracking() {
  const { data: students = [], isLoading } = useQuery<StudentWithStats[]>({
    queryKey: ["/api/students"],
  });

  const progressData = students.map(student => ({
    ...student,
    mathProgress: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
    mathChange: Math.floor(Math.random() * 20) - 10,
    languageProgress: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
    languageChange: Math.floor(Math.random() * 20) - 10,
    scienceProgress: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
    scienceChange: Math.floor(Math.random() * 20) - 10,
  }));

  const getProgressIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getProgressColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <>
        <Header 
          title="Progress Tracking" 
          description="Monitor student learning progress over time" 
        />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header 
        title="Progress Tracking" 
        description="Monitor student learning progress over time" 
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Students Improving</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On Track</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Need Intervention</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2 bg-red-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mathematics</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+5.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language Arts</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+3.8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Science</span>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">-1.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                  <span className="text-sm">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                  <span className="text-sm">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                  <span className="text-sm">15%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="progress-tracking-table">
          <CardHeader>
            <CardTitle>Individual Student Progress</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track progress changes across subjects for each student
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Mathematics
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Language Arts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Science
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Overall Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {progressData.map((student) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-muted/50 transition-colors"
                      data-testid={`progress-row-${student.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-medium">
                              {student.firstName[0]}{student.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-foreground">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.grade}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getProgressIcon(student.mathProgress)}
                          <span className={`text-sm ${getProgressColor(student.mathProgress)}`}>
                            {student.mathChange > 0 ? '+' : ''}{student.mathChange}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({student.mathematicsScore}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getProgressIcon(student.languageProgress)}
                          <span className={`text-sm ${getProgressColor(student.languageProgress)}`}>
                            {student.languageChange > 0 ? '+' : ''}{student.languageChange}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({student.languageArtsScore}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getProgressIcon(student.scienceProgress)}
                          <span className={`text-sm ${getProgressColor(student.scienceProgress)}`}>
                            {student.scienceChange > 0 ? '+' : ''}{student.scienceChange}%
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({student.scienceScore}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={
                            student.mathProgress === "up" || student.languageProgress === "up" || student.scienceProgress === "up"
                              ? "bg-green-100 text-green-800"
                              : student.mathProgress === "down" || student.languageProgress === "down" || student.scienceProgress === "down"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {(student.mathProgress === "up" || student.languageProgress === "up" || student.scienceProgress === "up") && 
                           !(student.mathProgress === "down" || student.languageProgress === "down" || student.scienceProgress === "down")
                            ? "Improving"
                            : (student.mathProgress === "down" || student.languageProgress === "down" || student.scienceProgress === "down") &&
                              !(student.mathProgress === "up" || student.languageProgress === "up" || student.scienceProgress === "up")
                            ? "Declining"
                            : "Mixed"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}