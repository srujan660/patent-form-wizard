
import React from 'react';
import { usePatentForm } from '@/context/PatentFormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle2, File, FileCheck } from 'lucide-react';

const ReviewStep: React.FC = () => {
  const { formData, submitForm } = usePatentForm();
  const { applicantInfo, inventors, inventionInfo, filingInfo } = formData;

  const allAcknowledgmentsChecked = Object.values(filingInfo.acknowledgments).every(Boolean);
  const requiredFilesUploaded = filingInfo.drawings && filingInfo.specification;
  
  const canSubmit = allAcknowledgmentsChecked && requiredFilesUploaded;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Review Your Application</h2>
        <p className="text-muted-foreground">Please verify all information before submitting.</p>
      </div>
      
      <Card>
        <CardHeader className="bg-secondary rounded-t-lg">
          <CardTitle className="text-lg">Applicant Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Applicant Type</dt>
              <dd className="font-medium capitalize">{applicantInfo.applicantType}</dd>
            </div>
            
            {applicantInfo.applicantType === 'organization' && (
              <div>
                <dt className="text-sm text-muted-foreground">Company Name</dt>
                <dd className="font-medium">{applicantInfo.companyName || 'Not provided'}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm text-muted-foreground">Name</dt>
              <dd className="font-medium">{applicantInfo.firstName} {applicantInfo.lastName}</dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Contact</dt>
              <dd className="font-medium">{applicantInfo.email} | {applicantInfo.phone}</dd>
            </div>
            
            <div className="md:col-span-2">
              <dt className="text-sm text-muted-foreground">Address</dt>
              <dd className="font-medium">{applicantInfo.address}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-secondary rounded-t-lg">
          <CardTitle className="text-lg">Inventors</CardTitle>
          <CardDescription>
            {inventors.length} {inventors.length === 1 ? 'inventor' : 'inventors'} listed
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {inventors.map((inventor, index) => (
              <div key={inventor.id} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">
                  {index === 0 ? 'Primary Inventor' : `Inventor ${index + 1}`}
                </h4>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Name</dt>
                    <dd className="font-medium">{inventor.firstName} {inventor.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="font-medium">{inventor.email}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-sm text-muted-foreground">Address</dt>
                    <dd className="font-medium">{inventor.address}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-secondary rounded-t-lg">
          <CardTitle className="text-lg">Invention Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Title</dt>
              <dd className="font-medium">{inventionInfo.title}</dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Category</dt>
              <dd className="font-medium capitalize">{inventionInfo.category || 'Not specified'}</dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Abstract</dt>
              <dd className="border p-3 rounded-md bg-muted/30 mt-1">
                {inventionInfo.abstract || 'Not provided'}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Description</dt>
              <dd className="border p-3 rounded-md bg-muted/30 mt-1">
                {inventionInfo.description || 'Not provided'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-secondary rounded-t-lg">
          <CardTitle className="text-lg">Filing Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Filing Date</dt>
              <dd className="font-medium">
                {filingInfo.filingDate ? format(filingInfo.filingDate, 'MMMM d, yyyy') : 'Not specified'}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Priority Date</dt>
              <dd className="font-medium">
                {filingInfo.priorityDate ? format(filingInfo.priorityDate, 'MMMM d, yyyy') : 'None'}
              </dd>
            </div>
            
            <div>
              <dt className="text-sm text-muted-foreground">Country of Filing</dt>
              <dd className="font-medium">{filingInfo.countryOfFiling}</dd>
            </div>
          </dl>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Uploaded Documents</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                {filingInfo.drawings ? (
                  <FileCheck className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <File className="h-5 w-5 text-amber-600 mr-2" />
                )}
                <span>
                  Drawings: {filingInfo.drawings ? filingInfo.drawings.name : 'Not uploaded'}
                </span>
              </div>
              
              <div className="flex items-center">
                {filingInfo.specification ? (
                  <FileCheck className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <File className="h-5 w-5 text-amber-600 mr-2" />
                )}
                <span>
                  Specification: {filingInfo.specification ? filingInfo.specification.name : 'Not uploaded'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Acknowledgments</h4>
            <div className="space-y-2">
              {Object.entries(filingInfo.acknowledgments).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <CheckCircle2 
                    className={value ? "h-5 w-5 text-green-600 mr-2" : "h-5 w-5 text-gray-300 mr-2"} 
                  />
                  <span className={value ? "" : "text-muted-foreground"}>
                    {key === 'truthfulness' && 'Confirmation of truthfulness'}
                    {key === 'ownership' && 'Confirmation of ownership'}
                    {key === 'priorArt' && 'Acknowledgment of prior art disclosure'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="border-t pt-6">
        <div className="flex justify-center">
          <Button 
            onClick={submitForm}
            disabled={!canSubmit}
            size="lg"
            className="w-full max-w-md"
          >
            Submit Patent Application
          </Button>
        </div>
        
        {!canSubmit && (
          <p className="text-center text-amber-600 mt-4 text-sm">
            Please complete all required fields and acknowledgments before submitting.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
