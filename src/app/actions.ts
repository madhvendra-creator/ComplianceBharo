'use server';

import { supabase } from '../utils/supabaseClient';

export type SubmitLeadState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
  };
};

export async function submitLead(prevState: SubmitLeadState | null, formData: FormData): Promise<SubmitLeadState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const service = formData.get('service') as string;

  const errors: SubmitLeadState['errors'] = {};

  // Basic validation rules
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Matches Indian 10-digit phone numbers starting with 6-9
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!service || service.trim().length < 2) {
    errors.service = 'Please select a service.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the errors highlighted below.',
      errors,
    };
  }

  try {
    const { error } = await supabase
      .from('consultations')
      .insert([
        {
          full_name: name,
          email: email,
          phone_number: phone,
          service: service,
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        message: 'Something went wrong while submitting your request. Please try again later.',
      };
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }

  return {
    success: true,
    message: `Thank you, ${name}! Your request for ${service} has been received. Our ComplianceBharo expert will contact you on ${phone} within 10 minutes.`,
  };
}
