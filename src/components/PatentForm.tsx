
import React from 'react';
import { usePatentForm } from '@/context/PatentFormContext';
import StepIndicator from './StepIndicator';
import ApplicantStep from './steps/ApplicantStep';
import InventionStep from './steps/InventionStep';
import FilingStep from './steps/FilingStep';
import ReviewStep from './steps/ReviewStep';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

const steps = [
  'Applicant Info',
  'Invention Details',
  'Filing & Documents',
  'Review & Submit'
];

const PatentForm: React.FC = () => {
  const { currentStep, setCurrentStep, saveFormData } = usePatentForm();

  const stepComponents = [
    <ApplicantStep key="applicant" />,
    <InventionStep key="invention" />,
    <FilingStep key="filing" />,
    <ReviewStep key="review" />
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = () => {
    saveFormData();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="mt-8 mb-12">
        {stepComponents[currentStep]}
      </div>
      
      <div className="flex items-center justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleSaveDraft}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" /> Save Draft
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            className="flex items-center gap-1"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PatentForm;
