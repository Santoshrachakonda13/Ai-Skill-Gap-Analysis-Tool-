import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: text("student_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  grade: text("grade").notNull(),
  email: text("email"),
  riskLevel: text("risk_level").notNull().default("low"), // low, medium, high
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  skillId: text("skill_id").notNull().unique(),
  name: text("name").notNull(),
  subject: text("subject").notNull(), // mathematics, language_arts, science, social_studies
  category: text("category").notNull(),
  description: text("description"),
  prerequisites: jsonb("prerequisites").$type<string[]>().default([]),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  assessmentType: text("assessment_type").notNull(), // mcq, open_ended, numeric
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  timeSpent: integer("time_spent"), // in minutes
  completedAt: timestamp("completed_at").defaultNow(),
});

export const skillMastery = pgTable("skill_mastery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  skillId: varchar("skill_id").notNull().references(() => skills.id),
  masteryScore: decimal("mastery_score", { precision: 5, scale: 2 }).notNull(),
  confidence: decimal("confidence", { precision: 5, scale: 2 }).notNull(),
  lastAssessed: timestamp("last_assessed").defaultNow(),
});

export const skillGaps = pgTable("skill_gaps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  skillId: varchar("skill_id").notNull().references(() => skills.id),
  severity: text("severity").notNull(), // low, medium, high, critical
  recommendation: text("recommendation").notNull(),
  identifiedAt: timestamp("identified_at").defaultNow(),
});

export const curriculumPlans = pgTable("curriculum_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  subject: text("subject").notNull(),
  timeFrame: text("time_frame").notNull(),
  totalHours: integer("total_hours").notNull(),
  weeks: jsonb("weeks").$type<CurriculumWeek[]>().notNull(),
  aiRecommendation: text("ai_recommendation"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const progressTracking = pgTable("progress_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  skillId: varchar("skill_id").notNull().references(() => skills.id),
  previousScore: decimal("previous_score", { precision: 5, scale: 2 }),
  currentScore: decimal("current_score", { precision: 5, scale: 2 }).notNull(),
  improvement: decimal("improvement", { precision: 5, scale: 2 }),
  trackedAt: timestamp("tracked_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => students.id),
  type: text("type").notNull(), // critical_gap, assessment_overdue, improvement_detected
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // low, medium, high, critical
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Types
export interface CurriculumWeek {
  week: number;
  title: string;
  hours: number;
  description: string;
  topics: CurriculumTopic[];
}

export interface CurriculumTopic {
  title: string;
  status: 'completed' | 'in_progress' | 'pending';
  estimatedHours: number;
}

export interface StudentWithStats {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  grade: string;
  riskLevel: string;
  mathematicsScore: number;
  languageArtsScore: number;
  scienceScore: number;
  lastAssessment: string;
}

export interface DashboardMetrics {
  totalStudents: number;
  assessmentsCompleted: number;
  skillGapsIdentified: number;
  avgMasteryScore: number;
}

// Insert schemas
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

export const insertSkillMasterySchema = createInsertSchema(skillMastery).omit({
  id: true,
  lastAssessed: true,
});

export const insertSkillGapSchema = createInsertSchema(skillGaps).omit({
  id: true,
  identifiedAt: true,
});

export const insertCurriculumPlanSchema = createInsertSchema(curriculumPlans).omit({
  id: true,
  createdAt: true,
});

export const insertProgressTrackingSchema = createInsertSchema(progressTracking).omit({
  id: true,
  trackedAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

// Inferred types
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type SkillMastery = typeof skillMastery.$inferSelect;
export type InsertSkillMastery = z.infer<typeof insertSkillMasterySchema>;
export type SkillGap = typeof skillGaps.$inferSelect;
export type InsertSkillGap = z.infer<typeof insertSkillGapSchema>;
export type CurriculumPlan = typeof curriculumPlans.$inferSelect;
export type InsertCurriculumPlan = z.infer<typeof insertCurriculumPlanSchema>;
export type ProgressTracking = typeof progressTracking.$inferSelect;
export type InsertProgressTracking = z.infer<typeof insertProgressTrackingSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
