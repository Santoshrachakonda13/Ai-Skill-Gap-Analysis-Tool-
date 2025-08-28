import Header from "@/components/layout/header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import SkillMasteryChart from "@/components/dashboard/skill-mastery-chart";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import StudentTable from "@/components/dashboard/student-table";
import CurriculumGenerator from "@/components/dashboard/curriculum-generator";

export default function Dashboard() {
  return (
    <>
      <Header 
        title="Dashboard Overview" 
        description="Monitor student progress and identify skill gaps" 
      />
      <div className="p-6 space-y-6">
        <MetricsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkillMasteryChart />
          <RecentAlerts />
        </div>

        <StudentTable />
        
        <CurriculumGenerator />
      </div>
    </>
  );
}
