import { useQuery } from "@tanstack/react-query";
import { Users, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardMetrics } from "@/types";

const metricIcons = {
  totalStudents: { icon: Users, color: "text-primary", bg: "bg-blue-100" },
  assessmentsCompleted: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  skillGapsIdentified: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" },
  avgMasteryScore: { icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
};

export default function MetricsCards() {
  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const metricData = [
    {
      key: "totalStudents",
      label: "Total Students",
      value: metrics.totalStudents.toLocaleString(),
      change: "+12%",
      changeLabel: "from last month",
      changeType: "positive" as const,
    },
    {
      key: "assessmentsCompleted",
      label: "Assessments Completed",
      value: metrics.assessmentsCompleted.toLocaleString(),
      change: "+8%",
      changeLabel: "this week",
      changeType: "positive" as const,
    },
    {
      key: "skillGapsIdentified",
      label: "Skill Gaps Identified",
      value: metrics.skillGapsIdentified.toLocaleString(),
      change: "-5%",
      changeLabel: "improvement",
      changeType: "positive" as const,
    },
    {
      key: "avgMasteryScore",
      label: "Avg. Mastery Score",
      value: `${metrics.avgMasteryScore}%`,
      change: "+3.2%",
      changeLabel: "from last term",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricData.map((metric) => {
        const iconConfig = metricIcons[metric.key as keyof typeof metricIcons];
        const Icon = iconConfig.icon;

        return (
          <Card key={metric.key} className="hover-lift" data-testid={`metric-${metric.key}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground" data-testid={`metric-value-${metric.key}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconConfig.bg}`}>
                  <Icon className={`h-6 w-6 ${iconConfig.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium" data-testid={`metric-change-${metric.key}`}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground ml-2">
                  {metric.changeLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
