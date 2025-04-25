
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center md:justify-between">
        {/* Mobile stepper - shows only current step number */}
        <div className="md:hidden flex flex-col items-center">
          <div className="step-circle step-active">
            {currentStep + 1}
          </div>
          <div className="text-sm font-medium mt-2">{steps[currentStep]}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        {/* Desktop stepper - shows all steps */}
        <div className="hidden md:flex w-full max-w-3xl mx-auto items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              {/* Step circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn("step-circle", {
                    "step-active": index === currentStep,
                    "step-completed": index < currentStep,
                    "step-inactive": index > currentStep
                  })}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-sm font-medium mt-2 text-center">
                  {step}
                </div>
              </div>
              
              {/* Connecting line between circles */}
              {index < steps.length - 1 && (
                <div
                  className={cn("h-0.5 flex-1", {
                    "bg-primary": index < currentStep,
                    "bg-muted": index >= currentStep
                  })}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
