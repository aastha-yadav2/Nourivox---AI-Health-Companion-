-- Add new columns to profiles table for extended user information
ALTER TABLE public.profiles 
ADD COLUMN gender TEXT,
ADD COLUMN blood_group TEXT,
ADD COLUMN height TEXT,
ADD COLUMN weight TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN address TEXT,
ADD COLUMN allergies TEXT,
ADD COLUMN medical_conditions TEXT;