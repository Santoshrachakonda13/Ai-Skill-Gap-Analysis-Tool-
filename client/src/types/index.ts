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

export interface Alert {
  id: string;
  studentId: string;
  type: string;
  title: string;
  description: string;
  severity: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
  }[];
}

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
