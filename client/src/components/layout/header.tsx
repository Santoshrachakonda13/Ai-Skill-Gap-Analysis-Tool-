import { Bell, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { Alert } from "@/types";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  const { data: unreadAlerts = [] } = useQuery<Alert[]>({
    queryKey: ["/api/alerts/unread"],
  });
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation('/login');
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
            {title}
          </h1>
          <p className="text-muted-foreground" data-testid="page-description">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-testid="notifications-button"
          >
            <Bell className="h-5 w-5" />
            {unreadAlerts.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                data-testid="notifications-badge"
              >
                {unreadAlerts.length}
              </Badge>
            )}
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                {user?.name.split(' ').map(n => n[0]).join('') || 'AD'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground" data-testid="user-name">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-xs text-muted-foreground" data-testid="user-role">
                Administrator
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
              data-testid="logout-button"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
