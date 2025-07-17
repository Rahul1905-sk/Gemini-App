import { z } from 'zod';

export const phoneSchema = z.object({
  countryCode: z.coerce.string().min(1, 'Country code is required'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^\d+$/, 'Must contain only numbers')
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits')
});

export const registerSchema = phoneSchema.extend({
  name: z.string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .regex(/^[a-zA-Z ]+$/, 'Only letters allowed')
});

