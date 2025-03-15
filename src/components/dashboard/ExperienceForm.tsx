
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Building, Calendar, MapPin, Plus, Trash2 } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  currentJob: boolean;
}

const ExperienceForm = () => {
  const { toast } = useToast();
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    currentJob: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, currentJob: checked }));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const newExperience: Experience = {
      id: Date.now().toString(),
      ...formData
    };
    
    setExperienceList(prev => [...prev, newExperience]);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      currentJob: false
    });
    
    toast({
      title: "Experience added",
      description: "Your work experience has been added successfully.",
    });
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceList(experienceList.filter(exp => exp.id !== id));
    toast({
      title: "Experience removed",
      description: "The work experience entry has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddExperience} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="company"
                name="company"
                placeholder="Company or Organization Name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="position"
                name="position"
                placeholder="Your Job Title"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                disabled={formData.currentJob}
                required={!formData.currentJob}
              />
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox 
                id="currentJob" 
                checked={formData.currentJob}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="currentJob" className="text-sm font-normal">
                I currently work here
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              name="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your responsibilities, achievements, etc."
            value={formData.description}
            onChange={handleInputChange}
            className="resize-none"
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </form>
      
      {experienceList.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-medium">Your Work Experience</h3>
          
          {experienceList.map(experience => (
            <Card key={experience.id} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => handleRemoveExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="font-semibold">{experience.company}</h4>
                  <span className="text-sm text-gray-500">
                    {experience.startDate} - {experience.currentJob ? 'Present' : experience.endDate}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">{experience.position}</span>
                  <p className="text-sm text-gray-500">{experience.location}</p>
                </div>
                
                {experience.description && (
                  <p className="text-sm text-gray-600 mt-2">{experience.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
