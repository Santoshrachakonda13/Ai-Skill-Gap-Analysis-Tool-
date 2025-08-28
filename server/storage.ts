import { 
  type Student, 
  type InsertStudent,
  type Skill,
  type InsertSkill,
  type Assessment,
  type InsertAssessment,
  type SkillMastery,
  type InsertSkillMastery,
  type SkillGap,
  type InsertSkillGap,
  type CurriculumPlan,
  type InsertCurriculumPlan,
  type ProgressTracking,
  type InsertProgressTracking,
  type Alert,
  type InsertAlert,
  type StudentWithStats,
  type DashboardMetrics,
  type CurriculumWeek
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Students
  getStudent(id: string): Promise<Student | undefined>;
  getStudentByStudentId(studentId: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: string, student: Partial<InsertStudent>): Promise<Student>;
  getAllStudents(): Promise<Student[]>;
  getStudentsWithStats(): Promise<StudentWithStats[]>;
  
  // Skills
  getSkill(id: string): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  getSkillsBySubject(subject: string): Promise<Skill[]>;
  getAllSkills(): Promise<Skill[]>;
  
  // Assessments
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessmentsByStudent(studentId: string): Promise<Assessment[]>;
  getAllAssessments(): Promise<Assessment[]>;
  
  // Skill Mastery
  createSkillMastery(mastery: InsertSkillMastery): Promise<SkillMastery>;
  getSkillMasteryByStudent(studentId: string): Promise<SkillMastery[]>;
  updateSkillMastery(studentId: string, skillId: string, mastery: Partial<InsertSkillMastery>): Promise<SkillMastery>;
  
  // Skill Gaps
  createSkillGap(gap: InsertSkillGap): Promise<SkillGap>;
  getSkillGapsByStudent(studentId: string): Promise<SkillGap[]>;
  getAllSkillGaps(): Promise<SkillGap[]>;
  
  // Curriculum Plans
  createCurriculumPlan(plan: InsertCurriculumPlan): Promise<CurriculumPlan>;
  getCurriculumPlansByStudent(studentId: string): Promise<CurriculumPlan[]>;
  
  // Progress Tracking
  createProgressTracking(progress: InsertProgressTracking): Promise<ProgressTracking>;
  getProgressByStudent(studentId: string): Promise<ProgressTracking[]>;
  
  // Alerts
  createAlert(alert: InsertAlert): Promise<Alert>;
  getAllAlerts(): Promise<Alert[]>;
  getUnreadAlerts(): Promise<Alert[]>;
  markAlertAsRead(id: string): Promise<Alert>;
  
  // Dashboard
  getDashboardMetrics(): Promise<DashboardMetrics>;
}

export class MemStorage implements IStorage {
  private students: Map<string, Student> = new Map();
  private skills: Map<string, Skill> = new Map();
  private assessments: Map<string, Assessment> = new Map();
  private skillMastery: Map<string, SkillMastery> = new Map();
  private skillGaps: Map<string, SkillGap> = new Map();
  private curriculumPlans: Map<string, CurriculumPlan> = new Map();
  private progressTracking: Map<string, ProgressTracking> = new Map();
  private alerts: Map<string, Alert> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data to demonstrate functionality
    const sampleStudents: Student[] = [
      {
        id: "1",
        studentId: "ST001234",
        firstName: "Sarah",
        lastName: "Johnson",
        grade: "8th Grade",
        email: "sarah.johnson@school.edu",
        riskLevel: "high",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        studentId: "ST001235",
        firstName: "Mike",
        lastName: "Chen",
        grade: "7th Grade",
        email: "mike.chen@school.edu",
        riskLevel: "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        studentId: "ST001236",
        firstName: "Emma",
        lastName: "Davis",
        grade: "9th Grade",
        email: "emma.davis@school.edu",
        riskLevel: "low",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleStudents.forEach(student => this.students.set(student.id, student));

    // Sample skills
    const sampleSkills: Skill[] = [
      {
        id: "skill-1",
        skillId: "math.algebra.basic",
        name: "Basic Algebra",
        subject: "mathematics",
        category: "algebra",
        description: "Fundamental algebraic operations and concepts",
        prerequisites: [],
      },
      {
        id: "skill-2",
        skillId: "math.geometry.area",
        name: "Area Calculation",
        subject: "mathematics",
        category: "geometry",
        description: "Calculate area of various shapes",
        prerequisites: ["math.algebra.basic"],
      },
    ];

    sampleSkills.forEach(skill => this.skills.set(skill.id, skill));

    // Sample assessments
    const sampleAssessments: Assessment[] = [
      {
        id: "assess-1",
        studentId: "1",
        subject: "mathematics",
        assessmentType: "mcq",
        totalQuestions: 20,
        correctAnswers: 9,
        score: "45.00",
        timeSpent: 35,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "assess-2",
        studentId: "2",
        subject: "mathematics",
        assessmentType: "mcq",
        totalQuestions: 25,
        correctAnswers: 23,
        score: "91.00",
        timeSpent: 28,
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];

    sampleAssessments.forEach(assessment => this.assessments.set(assessment.id, assessment));

    // Sample alerts
    const sampleAlerts: Alert[] = [
      {
        id: "alert-1",
        studentId: "1",
        type: "critical_gap",
        title: "Critical Gap Detected",
        description: "Sarah Johnson - Algebra fundamentals",
        severity: "critical",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "alert-2",
        studentId: "2",
        type: "assessment_overdue",
        title: "Assessment Overdue",
        description: "Mike Chen - Reading comprehension",
        severity: "medium",
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      {
        id: "alert-3",
        studentId: "3",
        type: "improvement_detected",
        title: "Improvement Detected",
        description: "Emma Davis - Geometry mastery",
        severity: "low",
        isRead: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ];

    sampleAlerts.forEach(alert => this.alerts.set(alert.id, alert));
  }

  // Students
  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByStudentId(studentId: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      (student) => student.studentId === studentId,
    );
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { 
      ...insertStudent, 
      id,
      email: insertStudent.email || null,
      riskLevel: insertStudent.riskLevel || "low",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.students.set(id, student);
    return student;
  }

  async updateStudent(id: string, insertStudent: Partial<InsertStudent>): Promise<Student> {
    const existing = this.students.get(id);
    if (!existing) throw new Error("Student not found");
    
    const updated: Student = { 
      ...existing, 
      ...insertStudent,
      updatedAt: new Date(),
    };
    this.students.set(id, updated);
    return updated;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudentsWithStats(): Promise<StudentWithStats[]> {
    const students = Array.from(this.students.values());
    return students.map(student => ({
      id: student.id,
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      grade: student.grade,
      riskLevel: student.riskLevel,
      mathematicsScore: student.id === "1" ? 45 : student.id === "2" ? 91 : 95,
      languageArtsScore: student.id === "1" ? 72 : student.id === "2" ? 68 : 88,
      scienceScore: student.id === "1" ? 89 : student.id === "2" ? 84 : 92,
      lastAssessment: student.id === "1" ? "2 days ago" : student.id === "2" ? "1 day ago" : "3 hours ago",
    }));
  }

  // Skills
  async getSkill(id: string): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = { 
      ...insertSkill, 
      id,
      description: insertSkill.description || null,
      prerequisites: Array.isArray(insertSkill.prerequisites) ? insertSkill.prerequisites : null
    };
    this.skills.set(id, skill);
    return skill;
  }

  async getSkillsBySubject(subject: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.subject === subject);
  }

  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  // Assessments
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = { 
      ...insertAssessment, 
      id,
      timeSpent: insertAssessment.timeSpent || null,
      completedAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessmentsByStudent(studentId: string): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(assessment => assessment.studentId === studentId);
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  // Skill Mastery
  async createSkillMastery(insertMastery: InsertSkillMastery): Promise<SkillMastery> {
    const id = randomUUID();
    const mastery: SkillMastery = { 
      ...insertMastery, 
      id,
      lastAssessed: new Date(),
    };
    this.skillMastery.set(id, mastery);
    return mastery;
  }

  async getSkillMasteryByStudent(studentId: string): Promise<SkillMastery[]> {
    return Array.from(this.skillMastery.values()).filter(mastery => mastery.studentId === studentId);
  }

  async updateSkillMastery(studentId: string, skillId: string, insertMastery: Partial<InsertSkillMastery>): Promise<SkillMastery> {
    const existing = Array.from(this.skillMastery.values()).find(
      mastery => mastery.studentId === studentId && mastery.skillId === skillId
    );
    
    if (!existing) {
      return this.createSkillMastery({
        studentId,
        skillId,
        masteryScore: insertMastery.masteryScore || "0",
        confidence: insertMastery.confidence || "0",
      });
    }
    
    const updated: SkillMastery = { 
      ...existing, 
      ...insertMastery,
      lastAssessed: new Date(),
    };
    this.skillMastery.set(existing.id, updated);
    return updated;
  }

  // Skill Gaps
  async createSkillGap(insertGap: InsertSkillGap): Promise<SkillGap> {
    const id = randomUUID();
    const gap: SkillGap = { 
      ...insertGap, 
      id,
      identifiedAt: new Date(),
    };
    this.skillGaps.set(id, gap);
    return gap;
  }

  async getSkillGapsByStudent(studentId: string): Promise<SkillGap[]> {
    return Array.from(this.skillGaps.values()).filter(gap => gap.studentId === studentId);
  }

  async getAllSkillGaps(): Promise<SkillGap[]> {
    return Array.from(this.skillGaps.values());
  }

  // Curriculum Plans
  async createCurriculumPlan(insertPlan: InsertCurriculumPlan): Promise<CurriculumPlan> {
    const id = randomUUID();
    const plan: CurriculumPlan = { 
      ...insertPlan, 
      id,
      weeks: Array.isArray(insertPlan.weeks) ? insertPlan.weeks : [],
      aiRecommendation: insertPlan.aiRecommendation || null,
      createdAt: new Date(),
    };
    this.curriculumPlans.set(id, plan);
    return plan;
  }

  async getCurriculumPlansByStudent(studentId: string): Promise<CurriculumPlan[]> {
    return Array.from(this.curriculumPlans.values()).filter(plan => plan.studentId === studentId);
  }

  // Progress Tracking
  async createProgressTracking(insertProgress: InsertProgressTracking): Promise<ProgressTracking> {
    const id = randomUUID();
    const progress: ProgressTracking = { 
      ...insertProgress, 
      id,
      previousScore: insertProgress.previousScore || null,
      improvement: insertProgress.improvement || null,
      trackedAt: new Date(),
    };
    this.progressTracking.set(id, progress);
    return progress;
  }

  async getProgressByStudent(studentId: string): Promise<ProgressTracking[]> {
    return Array.from(this.progressTracking.values()).filter(progress => progress.studentId === studentId);
  }

  // Alerts
  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id,
      isRead: insertAlert.isRead || false,
      createdAt: new Date(),
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }

  async getUnreadAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => !alert.isRead);
  }

  async markAlertAsRead(id: string): Promise<Alert> {
    const alert = this.alerts.get(id);
    if (!alert) throw new Error("Alert not found");
    
    const updated: Alert = { ...alert, isRead: true };
    this.alerts.set(id, updated);
    return updated;
  }

  // Dashboard
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const totalStudents = this.students.size;
    const assessmentsCompleted = this.assessments.size;
    const skillGapsIdentified = this.skillGaps.size;
    
    const assessments = Array.from(this.assessments.values());
    const totalScore = assessments.reduce((sum, assessment) => sum + parseFloat(assessment.score), 0);
    const avgMasteryScore = assessments.length > 0 ? totalScore / assessments.length : 0;

    return {
      totalStudents,
      assessmentsCompleted,
      skillGapsIdentified,
      avgMasteryScore: Math.round(avgMasteryScore * 10) / 10,
    };
  }
}

export const storage = new MemStorage();
