import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStudentSchema,
  insertAssessmentSchema,
  insertSkillSchema,
  insertSkillMasterySchema,
  insertSkillGapSchema,
  insertCurriculumPlanSchema,
  insertAlertSchema,
  type CurriculumWeek
} from "@shared/schema";
import { z } from "zod";

// AI Service Mock Functions
function generateSkillAssessment(responses: any[]) {
  // Mock AI skill assessment
  return {
    skillMastery: responses.map((_, index) => ({
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

function generateCurriculum(studentId: string, subject: string, timeFrame: string): CurriculumWeek[] {
  // Mock AI curriculum generation
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

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Dashboard metrics
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  // Students
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getStudentsWithStats();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const student = await storage.getStudent(req.params.id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid student data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create student" });
    }
  });

  // Assessments
  app.get("/api/assessments", async (req, res) => {
    try {
      const assessments = await storage.getAllAssessments();
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  app.get("/api/students/:studentId/assessments", async (req, res) => {
    try {
      const assessments = await storage.getAssessmentsByStudent(req.params.studentId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student assessments" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(validatedData);
      res.status(201).json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid assessment data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create assessment" });
    }
  });

  // Skills
  app.get("/api/skills", async (req, res) => {
    try {
      const subject = req.query.subject as string;
      const skills = subject 
        ? await storage.getSkillsBySubject(subject)
        : await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid skill data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create skill" });
    }
  });

  // Skill mastery
  app.get("/api/students/:studentId/mastery", async (req, res) => {
    try {
      const mastery = await storage.getSkillMasteryByStudent(req.params.studentId);
      res.json(mastery);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skill mastery" });
    }
  });

  app.post("/api/mastery", async (req, res) => {
    try {
      const validatedData = insertSkillMasterySchema.parse(req.body);
      const mastery = await storage.createSkillMastery(validatedData);
      res.status(201).json(mastery);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid mastery data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create skill mastery" });
    }
  });

  // Skill gaps
  app.get("/api/skill-gaps", async (req, res) => {
    try {
      const skillGaps = await storage.getAllSkillGaps();
      res.json(skillGaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skill gaps" });
    }
  });

  app.get("/api/students/:studentId/skill-gaps", async (req, res) => {
    try {
      const skillGaps = await storage.getSkillGapsByStudent(req.params.studentId);
      res.json(skillGaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student skill gaps" });
    }
  });

  app.post("/api/skill-gaps", async (req, res) => {
    try {
      const validatedData = insertSkillGapSchema.parse(req.body);
      const skillGap = await storage.createSkillGap(validatedData);
      res.status(201).json(skillGap);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid skill gap data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create skill gap" });
    }
  });

  // AI Skill Assessment
  app.post("/api/ai/assess-skills", async (req, res) => {
    try {
      const { studentId, responses, assessmentId } = req.body;
      
      if (!studentId || !responses || !assessmentId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Mock AI processing
      const result = generateSkillAssessment(responses);
      
      // Store skill mastery results
      for (const mastery of result.skillMastery) {
        await storage.updateSkillMastery(studentId, mastery.skillId, {
          masteryScore: mastery.masteryScore.toFixed(2),
          confidence: mastery.confidence.toFixed(2),
        });
      }

      // Store skill gaps
      for (const gap of result.gaps) {
        await storage.createSkillGap({
          studentId,
          skillId: gap.skillId,
          severity: gap.severity,
          recommendation: gap.recommendation,
        });
      }

      res.json({
        studentId,
        mastery: result.skillMastery,
        gaps: result.gaps,
        processingTime: result.processingTime,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process skill assessment" });
    }
  });

  // AI Curriculum Generation
  app.post("/api/ai/generate-curriculum", async (req, res) => {
    try {
      const { studentId, subject, timeFrame, focusAreas } = req.body;
      
      if (!studentId || !subject || !timeFrame) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Mock AI curriculum generation
      const weeks = generateCurriculum(studentId, subject, timeFrame);
      const totalHours = weeks.reduce((sum, week) => sum + week.hours, 0);
      
      const aiRecommendation = "Include visual aids and manipulatives for better concept understanding based on student's learning profile.";

      // Store curriculum plan
      const curriculumPlan = await storage.createCurriculumPlan({
        studentId,
        subject,
        timeFrame,
        totalHours,
        weeks,
        aiRecommendation,
      });

      res.json(curriculumPlan);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate curriculum" });
    }
  });

  // Curriculum plans
  app.get("/api/students/:studentId/curriculum", async (req, res) => {
    try {
      const plans = await storage.getCurriculumPlansByStudent(req.params.studentId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch curriculum plans" });
    }
  });

  // Alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.get("/api/alerts/unread", async (req, res) => {
    try {
      const alerts = await storage.getUnreadAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch unread alerts" });
    }
  });

  app.patch("/api/alerts/:id/read", async (req, res) => {
    try {
      const alert = await storage.markAlertAsRead(req.params.id);
      res.json(alert);
    } catch (error) {
      res.status(500).json({ error: "Failed to mark alert as read" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid alert data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create alert" });
    }
  });

  // Chart data for dashboard
  app.get("/api/dashboard/skill-mastery-chart", async (req, res) => {
    try {
      // Mock chart data
      const chartData = {
        labels: ['Algebra', 'Geometry', 'Statistics', 'Reading Comp.', 'Writing', 'Grammar', 'Biology', 'Chemistry', 'Physics'],
        datasets: [{
          label: 'Mastery Level (%)',
          data: [65, 78, 82, 74, 69, 88, 91, 76, 83],
          backgroundColor: 'rgba(14, 165, 233, 0.8)',
          borderColor: 'rgba(14, 165, 233, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      };
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chart data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
