
import React from 'react';
import { usePatentForm } from '@/context/PatentFormContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import HelpTooltip from '@/components/HelpTooltip';

const inventionCategories = [
  { value: 'mechanical', label: 'Mechanical' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'chemical', label: 'Chemical' },
  { value: 'biotech', label: 'Biotechnology' },
  { value: 'software', label: 'Software' },
  { value: 'pharmaceutical', label: 'Pharmaceutical' },
  { value: 'other', label: 'Other' },
];

const InventionStep: React.FC = () => {
  const { formData, updateInventionInfo } = usePatentForm();
  const { inventionInfo } = formData;

  return (
    <div className="animate-fade-in">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Invention Details</h3>
                <HelpTooltip content="Provide comprehensive details about your invention. The more specific you are, the better your patent application will be." />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Please describe your invention in detail.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Invention Title <span className="text-destructive">*</span></Label>
                <Input
                  id="title"
                  value={inventionInfo.title}
                  onChange={(e) => updateInventionInfo({ title: e.target.value })}
                  placeholder="E.g., Method for Efficient Energy Storage"
                  required
                />
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="Select the category that best describes your invention. This helps in proper classification." />
                </div>
                <Select
                  value={inventionInfo.category}
                  onValueChange={(value) => updateInventionInfo({ category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventionCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="abstract">Abstract <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="A brief summary of your invention (usually 150-250 words). This will appear on the first page of your published patent." />
                </div>
                <Textarea
                  id="abstract"
                  value={inventionInfo.abstract}
                  onChange={(e) => updateInventionInfo({ abstract: e.target.value })}
                  placeholder="Briefly summarize your invention in a clear and concise manner."
                  className="h-24"
                  required
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {inventionInfo.abstract.length}/250 characters recommended
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="description">Detailed Description <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="Provide a complete description of your invention including its components, how it works, and how it's made or used." />
                </div>
                <Textarea
                  id="description"
                  value={inventionInfo.description}
                  onChange={(e) => updateInventionInfo({ description: e.target.value })}
                  placeholder="Describe the structure, components, and functionality of your invention in detail."
                  className="h-32"
                  required
                />
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="problem-solved">Problem Solved <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="Describe the problem or issue that your invention addresses or solves." />
                </div>
                <Textarea
                  id="problem-solved"
                  value={inventionInfo.problemSolved}
                  onChange={(e) => updateInventionInfo({ problemSolved: e.target.value })}
                  placeholder="What specific problem does your invention solve?"
                  className="h-24"
                  required
                />
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="use-case">Use Cases/Applications <span className="text-destructive">*</span></Label>
                  <HelpTooltip content="Describe the practical applications of your invention and how it might be used." />
                </div>
                <Textarea
                  id="use-case"
                  value={inventionInfo.useCase}
                  onChange={(e) => updateInventionInfo({ useCase: e.target.value })}
                  placeholder="How can your invention be used in real-world scenarios?"
                  className="h-24"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventionStep;
