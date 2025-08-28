import Header from "@/components/layout/header";
import StudentTable from "@/components/dashboard/student-table";

export default function Students() {
  return (
    <>
      <Header 
        title="Student Management" 
        description="Manage student profiles and track individual progress" 
      />
      <div className="p-6">
        <StudentTable />
      </div>
    </>
  );
}
