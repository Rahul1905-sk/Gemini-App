import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { PhoneForm } from '../components/auth/PhoneForm';
import { OtpForm } from '../components/auth/OtpForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const AuthPage = () => {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flowType, setFlowType] = useState('login');
  const { login } = useAuthStore();

  const handlePhoneSubmit = (phone, type) => {
    setPhoneNumber(phone);
    setFlowType(type);
    setStep(type === 'login' ? 'otp' : 'register');
  };

  const handleOtpSuccess = () => {
    login();
  };

  const handleRegisterSubmit = (phone) => {
    setPhoneNumber(phone);
    setStep('otp');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {step === 'phone' && 'Welcome to Gemini Chat'}
            {step === 'otp' && (flowType === 'login' ? 'Login' : 'Complete Registration')}
            {step === 'register' && 'Create Account'}
          </h1>
        </div>

        {step === 'phone' && (
          <PhoneForm
            onSuccess={handlePhoneSubmit}
          />
        )}

        {step === 'otp' && (
          <OtpForm
            phoneNumber={phoneNumber}
            flowType={flowType}
            onSuccess={handleOtpSuccess}
          />
        )}

        {step === 'register' && (
          <RegisterForm
            phoneNumber={phoneNumber}
            onSuccess={handleRegisterSubmit}
          />
        )}
      </div>
    </div>
  );
};
