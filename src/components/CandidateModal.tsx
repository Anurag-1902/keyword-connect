import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building2, 
  Calendar, 
  ExternalLink, 
  Star,
  Mail,
  Phone,
  Download
} from "lucide-react";
import { Candidate } from "./CandidateCard";

interface CandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
}) => {
  if (!candidate) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.profileImage} alt={candidate.name} />
              <AvatarFallback className="bg-primary-blue text-white text-lg">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
              <p className="text-muted-foreground">{candidate.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className={`h-4 w-4 ${getMatchColor(candidate.matchScore)}`} />
                <span className={`text-sm font-medium ${getMatchColor(candidate.matchScore)}`}>
                  {candidate.matchScore}% Match
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.experience}</span>
            </div>
          </div>

          <Separator />

          {/* Professional Summary */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Professional Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {candidate.summary}
            </p>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary-blue/10 text-primary-blue"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact Actions */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact & Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(`mailto:${candidate.name.toLowerCase().replace(' ', '.')}@example.com`)}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(candidate.linkedinUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                View LinkedIn
              </Button>
              
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  // Mock phone number
                  const phoneNumber = "+1 (555) 123-4567";
                  window.open(`tel:${phoneNumber}`);
                }}
              >
                <Phone className="h-4 w-4" />
                Call Candidate
              </Button>
              
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  // Mock download resume action
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `${candidate.name.replace(' ', '_')}_Resume.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>

          <Separator />

          {/* Additional Information */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-foreground">Availability:</span>
                <span className="text-muted-foreground ml-2">Available in 2 weeks</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Salary Range:</span>
                <span className="text-muted-foreground ml-2">$90K - $130K</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Work Authorization:</span>
                <span className="text-muted-foreground ml-2">US Citizen</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Remote Work:</span>
                <span className="text-muted-foreground ml-2">Open to remote</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" size="lg">
              Schedule Interview
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              Add to Pipeline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};