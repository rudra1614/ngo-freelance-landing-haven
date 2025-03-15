
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { GraduationCap, Calendar, Award, MapPin, Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

const EducationForm = () => {
  const { toast } = useToast();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const newEducation: Education = {
      id: Date.now().toString(),
      ...formData
    };
    
    setEducationList(prev => [...prev, newEducation]);
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    });
    
    toast({
      title: "Education added",
      description: "Your education information has been added successfully.",
    });
  };

  const handleRemoveEducation = (id: string) => {
    setEducationList(educationList.filter(edu => edu.id !== id));
    toast({
      title: "Education removed",
      description: "The education entry has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddEducation} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="institution"
                name="institution"
                placeholder="University or School Name"
                value={formData.institution}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="degree"
                name="degree"
                placeholder="Bachelor's, Master's, etc."
                value={formData.degree}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder="Computer Science, Business, etc."
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            required
          />
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
            <Label htmlFor="endDate">End Date (or Expected)</Label>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
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
            placeholder="Describe your studies, achievements, etc."
            value={formData.description}
            onChange={handleInputChange}
            className="resize-none"
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </form>
      
      {educationList.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-medium">Your Education</h3>
          
          {educationList.map(education => (
            <Card key={education.id} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => handleRemoveEducation(education.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="font-semibold">{education.institution}</h4>
                  <span className="text-sm text-gray-500">
                    {education.startDate} - {education.endDate}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">{education.degree} in {education.fieldOfStudy}</span>
                  <p className="text-sm text-gray-500">{education.location}</p>
                </div>
                
                {education.description && (
                  <p className="text-sm text-gray-600 mt-2">{education.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
