
import React from 'react';
import { usePatentForm } from '@/context/PatentFormContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import FileUpload from '@/components/FileUpload';
import { Card, CardContent } from '@/components/ui/card';
import HelpTooltip from '@/components/HelpTooltip';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'JP', label: 'Japan' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'CN', label: 'China' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
];

const FilingStep: React.FC = () => {
  const { formData, updateFilingInfo, updateAcknowledgments } = usePatentForm();
  const { filingInfo } = formData;

  return (
    <div className="animate-fade-in space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Filing Details</h3>
                <HelpTooltip content="Information related to the legal filing of your patent application." />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Please provide information about when and where you plan to file your patent.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <Label>Filing Date</Label>
                  <HelpTooltip content="The date you intend to file this patent application. Leave blank if you're not sure yet." />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !filingInfo.filingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filingInfo.filingDate ? (
                        format(filingInfo.filingDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filingInfo.filingDate || undefined}
                      onSelect={(date) => updateFilingInfo({ filingDate: date || null })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <div className="flex items-center">
                  <Label>Priority Date (if applicable)</Label>
                  <HelpTooltip content="If you've previously filed a related patent application, enter its filing date here to claim priority." />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !filingInfo.priorityDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filingInfo.priorityDate ? (
                        format(filingInfo.priorityDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filingInfo.priorityDate || undefined}
                      onSelect={(date) => updateFilingInfo({ priorityDate: date || null })}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="country">Country of Filing <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="The country where you plan to file your patent application first." />
                </div>
                <Select 
                  value={filingInfo.countryOfFiling} 
                  onValueChange={(value) => updateFilingInfo({ countryOfFiling: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.label}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Documents</h3>
                <HelpTooltip content="Upload drawings, specifications, and any other supporting documents for your patent application." />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Please upload the required documents for your patent application.
              </p>
            </div>

            <div className="space-y-6">
              <FileUpload
                id="drawings"
                label="Drawings or Figures"
                description="Upload diagrams, sketches, or figures that illustrate your invention."
                accept=".jpg,.jpeg,.png,.pdf"
                maxSizeMB={5}
                required
                onChange={(file) => updateFilingInfo({ drawings: file })}
              />

              <FileUpload
                id="specification"
                label="Specification Document"
                description="Upload a detailed technical description of your invention."
                accept=".doc,.docx,.pdf"
                maxSizeMB={10}
                required
                onChange={(file) => updateFilingInfo({ specification: file })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Acknowledgments</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please read and acknowledge the following statements.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="truthfulness"
                  checked={filingInfo.acknowledgments.truthfulness}
                  onCheckedChange={(checked) => 
                    updateAcknowledgments('truthfulness', checked === true)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="truthfulness"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I confirm that all information provided in this application is true and correct to the best of my knowledge.
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="ownership"
                  checked={filingInfo.acknowledgments.ownership}
                  onCheckedChange={(checked) => 
                    updateAcknowledgments('ownership', checked === true)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="ownership"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I confirm that I have the right to file this patent application and that I am the owner of the invention or authorized to act on behalf of the owner.
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="prior-art"
                  checked={filingInfo.acknowledgments.priorArt}
                  onCheckedChange={(checked) => 
                    updateAcknowledgments('priorArt', checked === true)
                  }
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="prior-art"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I understand the duty to disclose all known prior art relevant to the patentability of this invention.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilingStep;
