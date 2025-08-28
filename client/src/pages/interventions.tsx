import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, User, Calendar, BookOpen } from "lucide-react";

const interventions = [
  {
    id: "1",
    studentName: "Sarah Johnson",
    studentId: "ST001234",
    type: "Skill Gap",
    priority: "High",
    subject: "Mathematics",
    description: "Student struggling with algebraic operations and equation solving",
    recommendedAction: "Schedule 1-on-1 tutoring sessions focusing on algebra fundamentals",
    status: "Active",
    assignedTo: "Ms. Rodriguez",
    dueDate: "2025-01-15",
    estimatedTime: "3 weeks"
  },
  {
    id: "2",
    studentName: "Mike Chen",
    studentId: "ST001235",
    type: "Assessment Overdue",
    priority: "Medium",
    subject: "Language Arts",
    description: "Student has not completed reading comprehension assessment",
    recommendedAction: "Contact student and schedule makeup assessment",
    status: "Pending",
    assignedTo: "Mr. Thompson",
    dueDate: "2025-01-10",
    estimatedTime: "1 week"
  },
  {
    id: "3",
    studentName: "Emma Davis",
    studentId: "ST001236",
    type: "Behavioral",
    priority: "Low",
    subject: "General",
    description: "Student showing decreased engagement in classroom activities",
    recommendedAction: "Implement gamification strategies to increase motivation",
    status: "Completed",
    assignedTo: "Ms. Carter",
    dueDate: "2025-01-05",
    estimatedTime: "2 weeks"
  }
];

const priorityColors = {
  "High": "bg-red-100 text-red-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Low": "bg-green-100 text-green-800"
};

const statusColors = {
  "Active": "bg-blue-100 text-blue-800",
  "Pending": "bg-yellow-100 text-yellow-800",
  "Completed": "bg-green-100 text-green-800"
};

const typeIcons = {
  "Skill Gap": AlertTriangle,
  "Assessment Overdue": Clock,
  "Behavioral": User
};

export default function Interventions() {
  return (
    <>
      <Header 
        title="Intervention Management" 
        description="Manage and track student intervention strategies" 
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {interventions.filter(i => i.status === "Active").length}
              </div>
              <p className="text-sm text-muted-foreground">Currently being implemented</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {interventions.filter(i => i.status === "Pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Awaiting implementation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {interventions.filter(i => i.status === "Completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Successfully resolved</p>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="interventions-table">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Intervention Cases</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track and manage student intervention strategies
                </p>
              </div>
              <Button data-testid="create-intervention-button">
                Create New Intervention
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interventions.map((intervention) => {
                const Icon = typeIcons[intervention.type as keyof typeof typeIcons];
                
                return (
                  <div 
                    key={intervention.id} 
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    data-testid={`intervention-${intervention.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground">{intervention.studentName}</h4>
                            <Badge className="text-xs">ID: {intervention.studentId}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {intervention.description}
                          </p>
                          <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                            <p className="text-sm text-blue-800">
                              <strong>Recommended Action:</strong> {intervention.recommendedAction}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Assigned to:</span>
                              <span className="font-medium">{intervention.assignedTo}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Due:</span>
                              <span className="font-medium">{intervention.dueDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="font-medium">{intervention.estimatedTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Subject:</span>
                              <span className="font-medium">{intervention.subject}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={priorityColors[intervention.priority as keyof typeof priorityColors]}>
                          {intervention.priority} Priority
                        </Badge>
                        <Badge className={statusColors[intervention.status as keyof typeof statusColors]}>
                          {intervention.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-testid={`view-details-${intervention.id}`}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-testid={`edit-intervention-${intervention.id}`}
                      >
                        Edit
                      </Button>
                      {intervention.status === "Active" && (
                        <Button 
                          size="sm"
                          data-testid={`mark-complete-${intervention.id}`}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}