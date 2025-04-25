
import React, { useEffect } from 'react';
import { usePatentForm } from '@/context/PatentFormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HelpTooltip from '@/components/HelpTooltip';
import InventorFields from '@/components/InventorFields';
import { Card, CardContent } from '@/components/ui/card';

const ApplicantStep: React.FC = () => {
  const {
    formData,
    updateApplicantInfo,
    addInventor,
    removeInventor,
    updateInventor,
  } = usePatentForm();

  const { applicantInfo, inventors } = formData;

  // Auto-populate primary inventor info from applicant if they're the same
  useEffect(() => {
    if (applicantInfo.applicantType === 'individual' && inventors.length > 0) {
      // Only update if fields are empty to avoid overriding user input
      if (!inventors[0].firstName && !inventors[0].lastName) {
        updateInventor(inventors[0].id, 'firstName', applicantInfo.firstName);
        updateInventor(inventors[0].id, 'lastName', applicantInfo.lastName);
        updateInventor(inventors[0].id, 'email', applicantInfo.email);
        updateInventor(inventors[0].id, 'address', applicantInfo.address);
      }
    }
  }, [applicantInfo.firstName, applicantInfo.lastName, applicantInfo.email, applicantInfo.address]);

  return (
    <div className="animate-fade-in space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Applicant Information</h3>
                <HelpTooltip content="The applicant is the person or organization that will own the patent." />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Please provide information about who is applying for this patent.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center">
                  Applicant Type <span className="text-destructive ml-1">*</span>
                  <HelpTooltip content="Individual refers to a single person applying for a patent. Organization refers to a company or legal entity." />
                </Label>
                <RadioGroup
                  value={applicantInfo.applicantType}
                  onValueChange={(value) => updateApplicantInfo({ applicantType: value })}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="cursor-pointer">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization" className="cursor-pointer">Organization</Label>
                  </div>
                </RadioGroup>
              </div>

              {applicantInfo.applicantType === 'organization' && (
                <div>
                  <Label htmlFor="company-name">Company Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="company-name"
                    value={applicantInfo.companyName || ''}
                    onChange={(e) => updateApplicantInfo({ companyName: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="first-name"
                    value={applicantInfo.firstName}
                    onChange={(e) => updateApplicantInfo({ firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="last-name"
                    value={applicantInfo.lastName}
                    onChange={(e) => updateApplicantInfo({ lastName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicantInfo.email}
                    onChange={(e) => updateApplicantInfo({ email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={applicantInfo.phone}
                    onChange={(e) => updateApplicantInfo({ phone: e.target.value })}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="address"
                    value={applicantInfo.address}
                    onChange={(e) => updateApplicantInfo({ address: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <InventorFields
            inventors={inventors}
            onAddInventor={addInventor}
            onRemoveInventor={removeInventor}
            onInventorChange={updateInventor}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantStep;
