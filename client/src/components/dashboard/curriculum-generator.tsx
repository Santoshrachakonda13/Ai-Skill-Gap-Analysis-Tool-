import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, Check, Clock, Circle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { StudentWithStats, CurriculumWeek } from "@/types";

const topicIcons = {
  completed: Check,
  in_progress: Clock,
  pending: Circle,
};

const topicColors = {
  completed: "text-green-600",
  in_progress: "text-yellow-600",
  pending: "text-gray-400",
};

export default function CurriculumGenerator() {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["mathematics"]);
  const [timeFrame, setTimeFrame] = useState<string>("2 weeks");
  const [generatedCurriculum, setGeneratedCurriculum] = useState<CurriculumWeek[] | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [] } = useQuery<StudentWithStats[]>({
    queryKey: ["/api/students"],
  });

  const generateCurriculumMutation = useMutation({
    mutationFn: async (data: {
      studentId: string;
      subject: string;
      timeFrame: string;
      focusAreas: string[];
    }) => {
      const response = await apiRequest("POST", "/api/ai/generate-curriculum", data);
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedCurriculum(data.weeks);
      setAiRecommendation(data.aiRecommendation);
      toast({
        title: "Curriculum Generated",
        description: "AI has successfully created a personalized learning plan.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate curriculum. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setSelectedSubjects(prev => 
      checked 
        ? [...prev, subject]
        : prev.filter(s => s !== subject)
    );
  };

  const handleGenerate = () => {
    if (!selectedStudent || selectedSubjects.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a student and at least one subject.",
        variant: "destructive",
      });
      return;
    }

    generateCurriculumMutation.mutate({
      studentId: selectedStudent,
      subject: selectedSubjects[0], // For simplicity, use first selected subject
      timeFrame,
      focusAreas: selectedSubjects,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card data-testid="curriculum-generator-form">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Curriculum Generator</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create personalized learning paths
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="text-primary h-6 w-6" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="student-select" className="block text-sm font-medium text-foreground mb-2">
              Select Student
            </Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger data-testid="student-select">
                <SelectValue placeholder="Choose a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.firstName} {student.lastName} ({student.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-foreground mb-2">
              Subject Focus
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "mathematics", label: "Mathematics" },
                { id: "language_arts", label: "Language Arts" },
                { id: "science", label: "Science" },
                { id: "social_studies", label: "Social Studies" },
              ].map((subject) => (
                <div key={subject.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject.id}
                    checked={selectedSubjects.includes(subject.id)}
                    onCheckedChange={(checked) => 
                      handleSubjectChange(subject.id, checked as boolean)
                    }
                    data-testid={`subject-${subject.id}`}
                  />
                  <Label htmlFor={subject.id} className="text-sm">
                    {subject.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="time-frame" className="block text-sm font-medium text-foreground mb-2">
              Time Frame
            </Label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger data-testid="time-frame-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="2 months">2 months</SelectItem>
                <SelectItem value="1 semester">1 semester</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={generateCurriculumMutation.isPending}
            data-testid="generate-curriculum-button"
          >
            {generateCurriculumMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Generate Personalized Curriculum
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card data-testid="curriculum-plan-display">
        <CardHeader>
          <CardTitle>Generated Learning Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedCurriculum ? (
            <div className="space-y-4">
              {generatedCurriculum.map((week) => (
                <div 
                  key={week.week} 
                  className="border border-border rounded-lg p-4 bg-blue-50"
                  data-testid={`curriculum-week-${week.week}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">
                      Week {week.week}: {week.title}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {week.hours} hours
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {week.description}
                  </p>
                  <div className="space-y-2">
                    {week.topics.map((topic, index) => {
                      const Icon = topicIcons[topic.status];
                      const color = topicColors[topic.status];
                      
                      return (
                        <div 
                          key={index} 
                          className="flex items-center text-sm"
                          data-testid={`topic-${week.week}-${index}`}
                        >
                          <Icon className={`h-4 w-4 mr-2 ${color}`} />
                          <span>{topic.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {aiRecommendation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4" data-testid="ai-recommendation">
                  <div className="flex items-center text-sm text-green-800">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    <span className="font-medium">AI Recommendation:</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {aiRecommendation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a student and generate a curriculum to see the learning plan here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
