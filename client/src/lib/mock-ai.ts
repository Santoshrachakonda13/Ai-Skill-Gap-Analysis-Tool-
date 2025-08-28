import { CurriculumWeek } from "@/types";

export class MockAIService {
  static async assessSkills(studentId: string, responses: any[]) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      mastery: responses.map((_, index) => ({
        skillId: `skill-${index + 1}`,
        masteryScore: Math.random() * 100,
        confidence: Math.random() * 100,
      })),
      gaps: [
        {
          skillId: "math.algebra.basic",
          severity: "high",
          recommendation: "Focus on fundamental algebraic operations",
        },
      ],
      processingTime: Math.floor(Math.random() * 2000) + 500,
    };
  }

  static async generateCurriculum(
    studentId: string, 
    subject: string, 
    timeFrame: string,
    focusAreas: string[]
  ): Promise<CurriculumWeek[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const weeks: CurriculumWeek[] = [
      {
        week: 1,
        title: "Algebra Fundamentals",
        hours: 8,
        description: "Focus on basic algebraic operations and equation solving",
        topics: [
          { title: "Introduction to variables and expressions", status: "completed", estimatedHours: 2 },
          { title: "Solving simple linear equations", status: "in_progress", estimatedHours: 3 },
          { title: "Practice problems and assessment", status: "pending", estimatedHours: 3 },
        ],
      },
      {
        week: 2,
        title: "Advanced Equations",
        hours: 10,
        description: "Multi-step equations and problem-solving strategies",
        topics: [
          { title: "Multi-step linear equations", status: "pending", estimatedHours: 4 },
          { title: "Word problems and applications", status: "pending", estimatedHours: 3 },
          { title: "Final assessment and review", status: "pending", estimatedHours: 3 },
        ],
      },
    ];
    
    return weeks;
  }

  static getAIRecommendation(studentId: string): string {
    const recommendations = [
      "Include visual aids and manipulatives for better concept understanding based on student's learning profile.",
      "Focus on hands-on activities to improve engagement and retention.",
      "Implement peer learning sessions to enhance collaborative understanding.",
      "Use gamification techniques to increase motivation and participation.",
      "Provide additional scaffolding for complex problem-solving tasks.",
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }
}
