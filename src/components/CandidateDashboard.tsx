import React, { useState, useMemo } from "react";
import { CandidateCard, type Candidate } from "./CandidateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Target, TrendingUp } from "lucide-react";

interface CandidateDashboardProps {
  candidates: Candidate[];
  searchKeywords: string[];
  onViewCandidate: (candidate: Candidate) => void;
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  candidates,
  searchKeywords,
  onViewCandidate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match_score");

  // Get unique locations and experience levels for filters
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(candidates.map(c => c.location))];
    return uniqueLocations.sort();
  }, [candidates]);

  const experienceLevels = useMemo(() => {
    const levels = [...new Set(candidates.map(c => c.experience))];
    return levels.sort();
  }, [candidates]);

  // Filter and sort candidates
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch = searchTerm === "" || 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLocation = locationFilter === "all" || candidate.location === locationFilter;
      const matchesExperience = experienceFilter === "all" || candidate.experience === experienceFilter;

      return matchesSearch && matchesLocation && matchesExperience;
    });

    // Sort candidates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "match_score":
          return b.matchScore - a.matchScore;
        case "name":
          return a.name.localeCompare(b.name);
        case "experience":
          return a.experience.localeCompare(b.experience);
        default:
          return 0;
      }
    });

    return filtered;
  }, [candidates, searchTerm, locationFilter, experienceFilter, sortBy]);

  const averageMatchScore = useMemo(() => {
    if (filteredAndSortedCandidates.length === 0) return 0;
    const sum = filteredAndSortedCandidates.reduce((acc, candidate) => acc + candidate.matchScore, 0);
    return Math.round(sum / filteredAndSortedCandidates.length);
  }, [filteredAndSortedCandidates]);

  if (candidates.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Candidates Found</h3>
          <p className="text-muted-foreground">
            Submit a job description to start finding candidates
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-blue/10 rounded-lg">
                <Users className="h-5 w-5 text-primary-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
                <p className="text-2xl font-bold text-foreground">{filteredAndSortedCandidates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
                <p className="text-2xl font-bold text-foreground">{averageMatchScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Search Keywords</p>
                <p className="text-2xl font-bold text-foreground">{searchKeywords.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Keywords */}
      {searchKeywords.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Active Search Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {searchKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="bg-primary-blue/10 text-primary-blue">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match_score">Match Score</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onViewProfile={onViewCandidate}
          />
        ))}
      </div>

      {filteredAndSortedCandidates.length === 0 && candidates.length > 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};