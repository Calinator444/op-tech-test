import { getEmailExists } from '@/services/stakeholderService';
import { z } from 'zod';

export const stakeholderSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.string(),
  organisation: z.string(),
  createdAt: z.string(),
  title: z.string().optional(),
});

export const stakeholderArraySchema = z.array(stakeholderSchema);

export const stakeholderFormSchema = z.object({
  title: z.string().trim().transform((val)=> val ? val : undefined).optional(),
  firstName: z.string().trim().nonempty("First name is required").min(1, 'First name is required'),
  lastName: z.string().trim().nonempty("Last name is required").min(1, 'Last name is required'),
  email: z.string().trim().nonempty("Email is required").email('Invalid email address').refine(async email => {
    if(!email) return true; // Skip validation if email is empty, as the required check will handle it
    const result = await getEmailExists(email);
    return !result;
  }, {
    message: 'Email already exists',
  }),
  role: z.string().nonempty("Role is required").min(1, 'Role is required'),
  organisation: z.string().nonempty("Organisation is required").min(1, 'Organisation is required'),
});