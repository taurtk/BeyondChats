import React from 'react';
import { Check, CircleDot } from 'lucide-react';
import type { Step } from '../types';

interface Props {
  currentStep: Step;
}

export function StepIndicator({ currentStep }: Props) {
  const steps = [
    { id: 'registration', label: 'Registration' },
    { id: 'organization', label: 'Organization' },
    { id: 'integration', label: 'Integration' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step.id
                  ? 'bg-blue-600 text-white'
                  : index < steps.findIndex(s => s.id === currentStep)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < steps.findIndex(s => s.id === currentStep) ? (
                <Check className="w-5 h-5" />
              ) : currentStep === step.id ? (
                <CircleDot className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className="text-sm font-medium text-gray-600">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}