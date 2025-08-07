import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Building2, Calendar, ExternalLink, Star } from "lucide-react";

export interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  skills: string[];
  profileImage?: string;
  linkedinUrl: string;
  summary: string;
  matchScore: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: (candidate: Candidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onViewProfile,
}) => {
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
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.profileImage} alt={candidate.name} />
              <AvatarFallback className="bg-primary-blue text-white">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground">
                {candidate.name}
              </h3>
              <p className="text-sm text-muted-foreground">{candidate.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className={`h-4 w-4 ${getMatchColor(candidate.matchScore)}`} />
            <span className={`text-sm font-medium ${getMatchColor(candidate.matchScore)}`}>
              {candidate.matchScore}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{candidate.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{candidate.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{candidate.experience}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-card-foreground line-clamp-3">
            {candidate.summary}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-2">
            Key Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 6).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-primary-blue/10 text-primary-blue"
              >
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 6 && (
              <Badge variant="secondary" className="text-xs">
                +{candidate.skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewProfile(candidate)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => window.open(candidate.linkedinUrl, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};