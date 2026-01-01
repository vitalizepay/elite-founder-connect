-- Create ENUM types
CREATE TYPE public.business_stage_enum AS ENUM ('early', 'growing', 'established');
CREATE TYPE public.membership_type_enum AS ENUM ('founding', 'annual');
CREATE TYPE public.ibc_stories_enum AS ENUM ('yes', 'maybe');
CREATE TYPE public.application_status_enum AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create main applications table
CREATE TABLE public.ibc_membership_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    application_status application_status_enum NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Section 1: Personal & Business Details
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    role_designation TEXT NOT NULL,
    industry TEXT NOT NULL,
    years_in_business INTEGER NOT NULL CHECK (years_in_business >= 0),
    website_or_linkedin TEXT,
    email TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    
    -- Section 2: Business Overview
    business_description TEXT NOT NULL,
    business_stage business_stage_enum NOT NULL,
    
    -- Section 3: Community Fit
    reason_to_join TEXT NOT NULL,
    expected_gain TEXT NOT NULL,
    contribution_to_community TEXT NOT NULL,
    
    -- Section 4: Membership Selection
    membership_type membership_type_enum NOT NULL,
    
    -- Section 5: Engagement & Commitment
    participate_in_events BOOLEAN NOT NULL,
    understands_curation BOOLEAN NOT NULL,
    
    -- Section 6: IBC Stories (Optional)
    ibc_stories_interest ibc_stories_enum,
    
    -- Section 7: Declaration
    declaration_confirmed BOOLEAN NOT NULL CHECK (declaration_confirmed = true)
);

-- Enable RLS on applications
ALTER TABLE public.ibc_membership_applications ENABLE ROW LEVEL SECURITY;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on applications
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.ibc_membership_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for applications
-- Users can insert their own application
CREATE POLICY "Users can insert their own application"
    ON public.ibc_membership_applications FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can view their own application
CREATE POLICY "Users can view their own application"
    ON public.ibc_membership_applications FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
    ON public.ibc_membership_applications FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update applications
CREATE POLICY "Admins can update applications"
    ON public.ibc_membership_applications FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));