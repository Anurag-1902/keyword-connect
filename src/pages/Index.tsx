import React, { useState } from "react";
import { JobDescriptionForm } from "@/components/JobDescriptionForm";
import { CandidateDashboard } from "@/components/CandidateDashboard";
import { CandidateModal } from "@/components/CandidateModal";
import { Candidate } from "@/components/CandidateCard";
import { mockCandidates } from "@/data/mockCandidates";
import { Button } from "@/components/ui/button";
import { Users, Target, Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-recruiting.jpg";

const Index = () => {
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<"welcome" | "form" | "results">("welcome");

  const handleKeywordsExtracted = (keywords: string[], jd: string) => {
    setSearchKeywords(keywords);
    setJobDescription(jd);
    
    // Simulate candidate search with mock data
    // In a real app, this would call an API
    setTimeout(() => {
      setCandidates(mockCandidates);
      setCurrentStep("results");
    }, 1000);
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleStartOver = () => {
    setCurrentStep("form");
    setCandidates([]);
    setSearchKeywords([]);
    setJobDescription("");
  };

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-blue/10 rounded-full">
                  <Users className="h-12 w-12 text-primary-blue" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Smart Candidate
                <span className="text-primary-blue block">Sourcing Platform</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Transform your job descriptions into targeted candidate searches. 
                AI-powered keyword extraction meets LinkedIn profile discovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => setCurrentStep("form")}
                >
                  <Sparkles className="h-5 w-5" />
                  Start Candidate Search
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Target className="h-5 w-5" />
                  View Demo
                </Button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="p-3 bg-primary-blue/10 rounded-lg w-fit mx-auto mb-4">
                    <Target className="h-6 w-6 text-primary-blue" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">AI Keyword Extraction</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically extract relevant skills, roles, and requirements from job descriptions
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="p-3 bg-success/10 rounded-lg w-fit mx-auto mb-4">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Profile Discovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Find matching LinkedIn profiles based on extracted keywords and requirements
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="p-3 bg-warning/10 rounded-lg w-fit mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Get match scores and detailed candidate profiles with relevant experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidate Sourcing</h1>
            <p className="text-muted-foreground">Find the perfect candidates for your roles</p>
          </div>
          {currentStep === "results" && (
            <Button variant="outline" onClick={handleStartOver}>
              New Search
            </Button>
          )}
        </div>

        {/* Content */}
        {currentStep === "form" && (
          <div className="max-w-2xl mx-auto">
            <JobDescriptionForm onKeywordsExtracted={handleKeywordsExtracted} />
          </div>
        )}

        {currentStep === "results" && (
          <CandidateDashboard
            candidates={candidates}
            searchKeywords={searchKeywords}
            onViewCandidate={handleViewCandidate}
          />
        )}

        {/* Candidate Modal */}
        <CandidateModal
          candidate={selectedCandidate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;