-- Create table for public membership inquiries (no auth required)
CREATE TABLE public.membership_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  company_name TEXT NOT NULL,
  role_designation TEXT NOT NULL,
  industry TEXT NOT NULL,
  years_in_business INTEGER NOT NULL,
  website_or_linkedin TEXT,
  business_description TEXT NOT NULL,
  business_stage TEXT NOT NULL,
  reason_to_join TEXT NOT NULL,
  expected_gain TEXT NOT NULL,
  contribution_to_community TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  participate_in_events BOOLEAN NOT NULL DEFAULT false,
  understands_curation BOOLEAN NOT NULL DEFAULT false,
  ibc_stories_interest TEXT,
  declaration_confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.membership_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit inquiry"
ON public.membership_inquiries
FOR INSERT
WITH CHECK (true);

-- Only admins can view inquiries
CREATE POLICY "Admins can view all inquiries"
ON public.membership_inquiries
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));