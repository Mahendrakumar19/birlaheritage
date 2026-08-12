const { z } = require('zod');

const GRADES = [
  'nursery',
  'lkg',
  'ukg',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
];

const COUNTRIES = ['india', 'other'];

const digitsOnly = (value) => String(value || '').replace(/\D/g, '');

const admissionSchema = z
  .object({
    studentFirstName: z
      .string({ required_error: 'Student first name is required' })
      .trim()
      .min(2, 'Student first name must be at least 2 characters')
      .max(80, 'Student first name is too long'),

    studentLastName: z
      .string()
      .trim()
      .max(80, 'Student last name is too long')
      .optional()
      .or(z.literal('')),

    studentDob: z
      .string({ required_error: 'Student DOB is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Student DOB must be in YYYY-MM-DD format'),

    studentAadhaar: z
      .string({ required_error: 'Aadhaar number is required' })
      .trim()
      .transform(digitsOnly)
      .refine((v) => v.length === 12, 'Aadhaar must be exactly 12 digits'),

    grade: z.enum(GRADES, {
      errorMap: () => ({ message: `Please select a valid grade (nursery, lkg, ukg, 1–12)` }),
    }),

    parentGuardianName: z
      .string({ required_error: 'Parent/Guardian name is required' })
      .trim()
      .min(2, 'Parent/Guardian name must be at least 2 characters')
      .max(120, 'Parent/Guardian name is too long'),

    phone: z
      .string({ required_error: 'Phone number is required' })
      .trim()
      .transform(digitsOnly)
      .refine((v) => v.length === 10, 'Phone must be a 10-digit number')
      .refine((v) => /^[6-9]/.test(v), 'Phone must start with 6, 7, 8, or 9'),

    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Enter a valid email address')
      .max(120, 'Email is too long')
      .transform((v) => v.toLowerCase()),

    streetAddress: z
      .string({ required_error: 'Street address is required' })
      .trim()
      .min(3, 'Street address is too short')
      .max(200, 'Street address is too long'),

    // Optional — user may not have a second address line
    streetAddressLine2: z
      .string()
      .trim()
      .max(200, 'Street address line 2 is too long')
      .optional()
      .or(z.literal('')),

    city: z
      .string({ required_error: 'City is required' })
      .trim()
      .min(2, 'City name is too short')
      .max(80, 'City name is too long'),

    state: z
      .string({ required_error: 'State is required' })
      .trim()
      .min(2, 'State name is too short')
      .max(80, 'State name is too long'),

    pinCode: z
      .string({ required_error: 'Pin code is required' })
      .trim()
      .transform(digitsOnly)
      .refine((v) => v.length === 6, 'Pin code must be exactly 6 digits'),

    country: z.enum(COUNTRIES, {
      errorMap: () => ({ message: 'Please select a valid country' }),
    }),
  })
  .superRefine((data, ctx) => {
    const dob = new Date(`${data.studentDob}T00:00:00`);
    if (Number.isNaN(dob.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['studentDob'],
        message: 'Invalid date of birth',
      });
      return;
    }

    const today = new Date();
    if (dob > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['studentDob'],
        message: 'Date of birth cannot be in the future',
      });
    }

    // Age sanity check: student should be between 2 and 20 years
    const ageMs = today.getTime() - dob.getTime();
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
    if (dob <= today && ageYears < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['studentDob'],
        message: 'Student must be at least 2 years old',
      });
    }
    if (ageYears > 25) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['studentDob'],
        message: 'Please verify the date of birth',
      });
    }
  });

module.exports = {
  admissionSchema,
  GRADES,
  COUNTRIES,
};
