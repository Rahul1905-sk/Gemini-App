import { useState } from 'react';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkUserExists = async (phone) => {
    try {
      setIsLoading(true);
      return await authService.checkUserExists(phone);
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (phone) => {
    try {
      setIsLoading(true);
      await authService.sendOtp(phone);
      toast.success('OTP sent successfully');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (phone, otp) => {
    try {
      setIsLoading(true);
      await authService.verifyOtp(phone, otp);
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setIsLoading(true);
      await authService.registerUser(userData);
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    checkUserExists,
    sendOtp,
    verifyOtp,
    registerUser
  };
};