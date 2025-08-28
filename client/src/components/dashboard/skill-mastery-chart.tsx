import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ChartData } from "@/types";

export default function SkillMasteryChart() {
  const { data: chartData, isLoading } = useQuery<ChartData>({
    queryKey: ["/api/dashboard/skill-mastery-chart"],
  });

  if (isLoading) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Skill Mastery Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!chartData) return null;

  const chartDataFormatted = chartData.labels.map((label, index) => ({
    skill: label,
    mastery: chartData.datasets[0].data[index],
  }));

  return (
    <Card className="lg:col-span-2" data-testid="skill-mastery-chart">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Skill Mastery Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Student performance across key skill areas
            </p>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]" data-testid="subject-filter">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="language_arts">Language Arts</SelectItem>
              <SelectItem value="science">Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80" data-testid="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartDataFormatted}>
              <XAxis 
                dataKey="skill" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Mastery Level']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="mastery" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
