import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import type { Alert } from "@/types";

const alertIcons = {
  critical_gap: AlertCircle,
  assessment_overdue: Clock,
  improvement_detected: CheckCircle,
};

const alertStyles = {
  critical: "bg-red-50 border-red-200",
  high: "bg-red-50 border-red-200",
  medium: "bg-yellow-50 border-yellow-200",
  low: "bg-green-50 border-green-200",
};

const iconStyles = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-yellow-600 text-white",
  low: "bg-green-600 text-white",
};

export default function RecentAlerts() {
  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentAlerts = alerts.slice(0, 3);

  return (
    <Card data-testid="recent-alerts">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => {
            const Icon = alertIcons[alert.type as keyof typeof alertIcons] || AlertCircle;
            const alertStyle = alertStyles[alert.severity as keyof typeof alertStyles];
            const iconStyle = iconStyles[alert.severity as keyof typeof iconStyles];

            return (
              <div
                key={alert.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${alertStyle}`}
                data-testid={`alert-${alert.id}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconStyle}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground" data-testid={`alert-title-${alert.id}`}>
                    {alert.title}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`alert-description-${alert.id}`}>
                    {alert.description}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`alert-time-${alert.id}`}>
                    {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-4 text-primary hover:text-primary/80"
          data-testid="view-all-alerts-button"
        >
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
}
