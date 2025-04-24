
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StepProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export const Step: React.FC<StepProps> = ({ title, description, icon, className }) => {
  // This component doesn't render anything by itself
  // It's just a container for configuration
  return null;
};

interface StepsProps {
  children: React.ReactNode;
  currentStep: number;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({ children, currentStep, className }) => {
  // Filter out non-Step components and convert to props array
  const steps = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Step)
    .map((child) => (React.isValidElement(child) ? child.props : {})) as StepProps[];

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col sm:flex-row gap-4', className)}>
      {steps.map((step, index) => {
        const isActive = index + 1 <= currentStep;
        const isCompleted = index + 1 < currentStep;
        
        return (
          <div 
            key={index}
            className={cn(
              'flex flex-1 relative',
              index !== steps.length - 1 && 'pb-8 sm:pb-0',
            )}
          >
            {/* Connecting line */}
            {index !== steps.length - 1 && (
              <div 
                className={cn(
                  'absolute h-full w-0.5 sm:h-0.5 sm:w-full left-4 top-8 sm:left-[50%] sm:top-4 flex-grow',
                  isCompleted ? 'bg-brand' : 'bg-gray-200',
                )}
              />
            )}
            
            {/* Step content */}
            <div className="flex flex-row items-start sm:flex-col sm:items-center gap-4 z-10">
              {/* Step icon/number bubble */}
              <div 
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-white shrink-0',
                  isActive ? 'bg-brand' : 'bg-gray-200',
                )}
              >
                {step.icon || (index + 1)}
              </div>
              
              {/* Step text */}
              <div className="sm:text-center">
                <p 
                  className={cn(
                    'font-medium',
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p 
                    className={cn(
                      'text-sm',
                      isActive ? 'text-gray-600' : 'text-gray-400'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
