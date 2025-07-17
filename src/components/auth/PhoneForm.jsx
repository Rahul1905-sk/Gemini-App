import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CountryCodeSearch } from './CountryCodeSearch';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { phoneSchema } from '../../schemas/authSchemas';

export const PhoneForm = ({ onSuccess, onNewUser }) => {
  const { register, handleSubmit, control,watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {countryCode: '+91'}
  });

  const { sendOtp, checkUserExists } = useAuth();

  const handleAutofill = () => {
    setValue('countryCode','+91' )
    setValue('phoneNumber', '8770182248')
  }

  const onSubmit = async (data) => {
    try {
      const fullPhone = data.countryCode + data.phoneNumber;
      const exists = await checkUserExists(fullPhone);
      
      await sendOtp(fullPhone);
      
      if (exists) {
        onSuccess(fullPhone, 'login');
      } else {
        onSuccess(fullPhone, 'register');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium">Country Code</label>
        <CountryCodeSearch value={watch('countryCode')} setValue={setValue} />
        {errors.countryCode && (
          <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
          placeholder="1234567890"
          {...register('phoneNumber')}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue with OTP
      </button> 
      <p className='text-center'>OR</p>
      <button
        onClick={handleAutofill}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Autofill and Continue
      </button>
    </form>
  );
};