import { useQuery } from "@tanstack/react-query";
import { Search, Download } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { StudentWithStats } from "@/types";

const riskColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function StudentTable() {
  const { data: students = [], isLoading } = useQuery<StudentWithStats[]>({
    queryKey: ["/api/students"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="student-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Student Progress Overview</h3>
            <p className="text-sm text-muted-foreground">
              Recent assessment results and skill gap analysis
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search students..."
                className="pl-10 w-64"
                data-testid="search-input"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              data-testid="export-button"
              onClick={() => {
                // Export functionality
                console.log('Exporting student data...');
                const csvData = 'Student ID,Name,Grade,Risk Level,Math Score,Language Arts Score,Science Score,Last Assessment\n';
                const link = document.createElement('a');
                link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
                link.download = 'students.csv';
                link.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Grade
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
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {students.map((student) => (
                <tr 
                  key={student.id} 
                  className="hover:bg-muted/50 transition-colors"
                  data-testid={`student-row-${student.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-medium">
                          {student.firstName[0]}{student.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground" data-testid={`student-name-${student.id}`}>
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`student-id-${student.id}`}>
                          ID: {student.studentId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground" data-testid={`student-grade-${student.id}`}>
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-testid={`math-score-${student.id}`}>
                    <ProgressBar value={student.mathematicsScore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-testid={`language-score-${student.id}`}>
                    <ProgressBar value={student.languageArtsScore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-testid={`science-score-${student.id}`}>
                    <ProgressBar value={student.scienceScore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-testid={`risk-level-${student.id}`}>
                    <Badge 
                      className={riskColors[student.riskLevel as keyof typeof riskColors]}
                      variant="secondary"
                    >
                      {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground" data-testid={`last-assessment-${student.id}`}>
                    {student.lastAssessment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80 mr-2"
                      data-testid={`view-details-${student.id}`}
                      onClick={() => {
                        console.log(`Viewing details for student ${student.id}`);
                        alert(`Viewing details for ${student.firstName} ${student.lastName}`);
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-600 hover:text-green-800"
                      data-testid={`generate-plan-${student.id}`}
                      onClick={() => {
                        console.log(`Generating plan for student ${student.id}`);
                        alert(`Generating learning plan for ${student.firstName} ${student.lastName}`);
                      }}
                    >
                      Generate Plan
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground" data-testid="table-pagination-info">
              Showing {students.length} of {students.length} students
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled data-testid="pagination-previous">
                Previous
              </Button>
              <Button size="sm" data-testid="pagination-current">
                1
              </Button>
              <Button variant="outline" size="sm" disabled data-testid="pagination-next">
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
