import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StepIndicator } from './components/StepIndicator';
import { RegistrationForm } from './components/RegistrationForm';
import { OrganizationForm } from './components/OrganizationForm';
import { IntegrationForm } from './components/IntegrationForm';
import type { Step, UserData, OrganizationData } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('registration');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orgData, setOrgData] = useState<OrganizationData | null>(null);

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setCurrentStep('organization');
  };

  const handleOrganizationComplete = (data: OrganizationData) => {
    setOrgData(data);
    setCurrentStep('integration');
  };

  const handleIntegrationComplete = () => {
    setCurrentStep('success');
  };

  return (
    <GoogleOAuthProvider clientId="1032086619173-f74rs05nhddci469taei2bsrc9scg66n.apps.googleusercontent.com">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Setup Your BeyondChats Bot
            </h1>
            <p className="text-lg text-gray-600">
              Follow these steps to get your AI chatbot up and running
            </p>
          </div>

          <StepIndicator currentStep={currentStep} />

          <div className="mt-8">
            {currentStep === 'registration' && (
              <RegistrationForm onComplete={handleRegistrationComplete} />
            )}
            {currentStep === 'organization' && (
              <OrganizationForm onComplete={handleOrganizationComplete} />
            )}
            {currentStep === 'integration' && (
              <IntegrationForm onComplete={handleIntegrationComplete} />
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;