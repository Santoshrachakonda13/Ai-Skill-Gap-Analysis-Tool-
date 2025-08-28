import { Link, useLocation } from "wouter";
import { Brain, Users, BarChart3, BookOpen, TrendingUp, Lightbulb, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Assessments", href: "/assessments", icon: BarChart3 },
  { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "Progress Tracking", href: "/progress", icon: TrendingUp },
  { name: "Interventions", href: "/interventions", icon: Lightbulb },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-card shadow-lg border-r border-border">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AI SkillGap</h1>
            <p className="text-sm text-muted-foreground">myOnsite Healthcare</p>
          </div>
        </div>
      </div>
      
      <nav className="px-4 pb-6" data-testid="sidebar-navigation">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
