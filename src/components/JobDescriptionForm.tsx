import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobDescriptionFormProps {
  onKeywordsExtracted: (keywords: string[], jobDescription: string) => void;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  onKeywordsExtracted,
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock keyword extraction - in a real app, you'd call an AI service
  const extractKeywords = async (text: string): Promise<string[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI extraction logic
    const commonTechKeywords = [
      "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java", "AWS", 
      "Docker", "Kubernetes", "MongoDB", "PostgreSQL", "GraphQL", "REST API",
      "Machine Learning", "Data Science", "Frontend", "Backend", "Full Stack",
      "DevOps", "CI/CD", "Agile", "Scrum", "Leadership", "Team Lead", "Senior",
      "Junior", "Mid-level", "Remote", "Hybrid", "Startup", "Enterprise"
    ];

    const words = text.toLowerCase().split(/\W+/);
    const keywords = commonTechKeywords.filter(keyword => 
      words.some(word => keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase()))
    );

    // Add some role-specific keywords based on content
    if (text.toLowerCase().includes("frontend") || text.toLowerCase().includes("react")) {
      keywords.push("UI/UX", "Responsive Design", "CSS", "HTML");
    }
    if (text.toLowerCase().includes("backend") || text.toLowerCase().includes("api")) {
      keywords.push("Database", "Server", "API Design", "Microservices");
    }
    if (text.toLowerCase().includes("senior") || text.toLowerCase().includes("lead")) {
      keywords.push("Mentoring", "Architecture", "Code Review", "Technical Leadership");
    }

    return [...new Set(keywords)].slice(0, 12); // Remove duplicates and limit
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const keywords = await extractKeywords(jobDescription);
      setExtractedKeywords(keywords);
      onKeywordsExtracted(keywords, jobDescription);
      
      toast({
        title: "Keywords Extracted!",
        description: `Found ${keywords.length} relevant keywords for candidate search`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract keywords. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-subtle rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-primary-blue" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-foreground mb-2">
                Enter Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here... (e.g., We are looking for a Senior React Developer with 5+ years of experience in TypeScript, Node.js, and AWS...)"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] resize-none"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !jobDescription.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting Keywords...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Extract Keywords & Find Candidates
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {extractedKeywords.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Extracted Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {extractedKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-primary-blue/10 text-primary-blue">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};