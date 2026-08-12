const { z } = require('zod');

const digitsOnly = (value) => String(value || '').replace(/\D/g, '');

const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name is too long'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Enter a valid email address')
    .max(120)
    .transform((v) => v.toLowerCase()),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .transform(digitsOnly)
    .refine((v) => v.length === 10, 'Phone must be a 10-digit number')
    .refine((v) => /^[6-9]/.test(v), 'Phone must start with 6-9'),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

module.exports = {
  contactSchema,
};
