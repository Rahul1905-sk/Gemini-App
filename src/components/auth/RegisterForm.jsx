import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const RegisterForm = ({ phoneNumber, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      countryCode: phoneNumber.slice(0, -10),
      phoneNumber: phoneNumber.slice(-10)
    }
  });

  const { registerUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const fullPhone = data.countryCode + data.phoneNumber;
      await registerUser({
        name: data.name,
        phone: fullPhone
      });
      onSuccess(fullPhone, 'register');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
          placeholder="John Doe"
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Phone Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-1/3 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            {...register('countryCode')}
            readOnly
          />
          <input
            type="tel"
            className="flex-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            {...register('phoneNumber')}
            readOnly
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send OTP
      </button>
    </form>
  );
};