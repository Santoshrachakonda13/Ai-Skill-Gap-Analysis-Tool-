import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <Header 
        title="System Settings" 
        description="Configure application preferences and system options" 
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-name">Administrator Name</Label>
                <Input id="admin-name" defaultValue="John Doe" data-testid="admin-name-input" />
              </div>
              <div>
                <Label htmlFor="admin-email">Email Address</Label>
                <Input id="admin-email" type="email" defaultValue="john.doe@myonsite.com" data-testid="admin-email-input" />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="education">
                  <SelectTrigger data-testid="department-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="it">IT Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" data-testid="save-profile-button">Save Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-alerts">Email Alerts</Label>
                <Switch id="email-alerts" defaultChecked data-testid="email-alerts-switch" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="critical-alerts">Critical Gap Alerts</Label>
                <Switch id="critical-alerts" defaultChecked data-testid="critical-alerts-switch" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <Switch id="weekly-reports" defaultChecked data-testid="weekly-reports-switch" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="assessment-reminders">Assessment Reminders</Label>
                <Switch id="assessment-reminders" data-testid="assessment-reminders-switch" />
              </div>
              <Separator />
              <div>
                <Label>Alert Frequency</Label>
                <Select defaultValue="immediate">
                  <SelectTrigger data-testid="alert-frequency-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Display Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger data-testid="theme-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dashboard Layout</Label>
                <Select defaultValue="default">
                  <SelectTrigger data-testid="layout-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">Enable Animations</Label>
                <Switch id="animations" defaultChecked data-testid="animations-switch" />
              </div>
              <div>
                <Label htmlFor="items-per-page">Items per Page</Label>
                <Select defaultValue="20">
                  <SelectTrigger data-testid="items-per-page-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  <Switch id="two-factor" defaultChecked data-testid="two-factor-switch" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout">Auto Logout (minutes)</Label>
                <Input 
                  id="session-timeout" 
                  type="number" 
                  defaultValue="30" 
                  className="w-20"
                  data-testid="session-timeout-input"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="login-alerts">Login Alerts</Label>
                <Switch id="login-alerts" defaultChecked data-testid="login-alerts-switch" />
              </div>
              <Separator />
              <Button variant="outline" className="w-full" data-testid="change-password-button">
                Change Password
              </Button>
              <Button variant="outline" className="w-full" data-testid="download-security-log-button">
                Download Security Log
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Data Retention Period</Label>
                <Select defaultValue="2years">
                  <SelectTrigger data-testid="data-retention-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <Switch id="auto-backup" defaultChecked data-testid="auto-backup-switch" />
              </div>
              <div>
                <Label>Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger data-testid="backup-frequency-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" data-testid="export-data-button">
                  Export Data
                </Button>
                <Button variant="outline" size="sm" data-testid="import-data-button">
                  Import Data
                </Button>
              </div>
              <Button variant="outline" className="w-full" data-testid="create-backup-button">
                Create Manual Backup
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>System Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-muted-foreground">Version</Label>
                <p className="font-medium" data-testid="system-version">v2.1.0</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Updated</Label>
                <p className="font-medium" data-testid="last-updated">Aug 28, 2025</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Environment</Label>
                <Badge className="bg-blue-100 text-blue-800" data-testid="environment-badge">Development</Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">Database</Label>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium" data-testid="database-status">Connected</span>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">API Status</Label>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium" data-testid="api-status">Operational</span>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Storage</Label>
                <p className="font-medium" data-testid="storage-usage">2.3 GB / 10 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" data-testid="reset-settings-button">Reset to Defaults</Button>
          <Button data-testid="save-all-settings-button">Save All Settings</Button>
        </div>
      </div>
    </>
  );
}