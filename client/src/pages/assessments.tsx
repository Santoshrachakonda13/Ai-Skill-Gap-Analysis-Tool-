import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Assessments() {
  return (
    <>
      <Header 
        title="Assessment Management" 
        description="Create, manage, and analyze student assessments" 
      />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Assessment management features will be implemented here.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
