import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const OtpForm = ({ phoneNumber, flowType, onSuccess }) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(otpSchema)
  });

  const { verifyOtp } = useAuth();

  const onSubmit = async (data) => {
    try {
      await verifyOtp(phoneNumber, data.otp);
      toast.success('OTP verified successfully!');
      onSuccess();
    } catch (error) {
      setError('otp', {message: 'Invalid OTP please use 123456'})
      console.error({error})
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        We've sent a 6-digit OTP to {phoneNumber}
      </p>
      <p className="text-sm font-medium">
        {flowType === 'register' 
          ? 'Complete your registration' 
          : 'Login to your account'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Enter OTP</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
            placeholder="123456"
            {...register('otp')}
          />
          {errors.otp && (
            <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {flowType === 'register' ? 'Complete Registration' : 'Login'}
        </button>
      </form>
    </div>
  );
};