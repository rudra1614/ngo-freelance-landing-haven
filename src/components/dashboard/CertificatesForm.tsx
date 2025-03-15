
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Award, Calendar, FileUp, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate: string;
  credentialURL: string;
  description: string;
}

const CertificatesForm = () => {
  const { toast } = useToast();
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [formData, setFormData] = useState<Omit<Certificate, 'id'>>({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expirationDate: '',
    credentialURL: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      ...formData
    };
    
    setCertificateList(prev => [...prev, newCertificate]);
    setFormData({
      name: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      credentialURL: '',
      description: ''
    });
    
    toast({
      title: "Certificate added",
      description: "Your certificate has been added successfully.",
    });
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificateList(certificateList.filter(cert => cert.id !== id));
    toast({
      title: "Certificate removed",
      description: "The certificate has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddCertificate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Certificate Name</Label>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                placeholder="Certificate or License Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="issuingOrganization">Issuing Organization</Label>
            <Input
              id="issuingOrganization"
              name="issuingOrganization"
              placeholder="Organization that issued the certificate"
              value={formData.issuingOrganization}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Expiration Date (if applicable)</Label>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                id="expirationDate"
                name="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="credentialURL">Credential URL (if available)</Label>
          <div className="flex items-center">
            <LinkIcon className="mr-2 h-4 w-4 text-gray-400" />
            <Input
              id="credentialURL"
              name="credentialURL"
              type="url"
              placeholder="https://example.com/verify/credential"
              value={formData.credentialURL}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe what you learned, skills gained, etc."
            value={formData.description}
            onChange={handleInputChange}
            className="resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file">Upload Certificate (optional)</Label>
          <div className="flex items-center mt-1">
            <Button type="button" variant="outline" className="w-full">
              <FileUp className="mr-2 h-4 w-4" /> Upload Certificate
              <Input 
                id="file" 
                type="file" 
                className="hidden" 
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PDF, JPG, JPEG, PNG (max 5MB)
          </p>
        </div>
        
        <Button type="submit" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Certificate
        </Button>
      </form>
      
      {certificateList.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-medium">Your Certificates</h3>
          
          {certificateList.map(certificate => (
            <Card key={certificate.id} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => handleRemoveCertificate(certificate.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="font-semibold">{certificate.name}</h4>
                  <span className="text-sm text-gray-500">
                    Issued: {certificate.issueDate}
                    {certificate.expirationDate && ` | Expires: ${certificate.expirationDate}`}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium">{certificate.issuingOrganization}</span>
                </div>
                
                {certificate.credentialURL && (
                  <div className="flex items-center text-sm text-blue-600 hover:underline mb-2">
                    <LinkIcon className="mr-1 h-3 w-3" />
                    <a href={certificate.credentialURL} target="_blank" rel="noopener noreferrer">
                      View Credential
                    </a>
                  </div>
                )}
                
                {certificate.description && (
                  <p className="text-sm text-gray-600 mt-2">{certificate.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesForm;
