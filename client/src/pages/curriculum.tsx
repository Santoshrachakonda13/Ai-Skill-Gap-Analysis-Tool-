import Header from "@/components/layout/header";
import CurriculumGenerator from "@/components/dashboard/curriculum-generator";

export default function Curriculum() {
  return (
    <>
      <Header 
        title="Curriculum Planning" 
        description="Generate and manage personalized learning curricula" 
      />
      <div className="p-6">
        <CurriculumGenerator />
      </div>
    </>
  );
}
