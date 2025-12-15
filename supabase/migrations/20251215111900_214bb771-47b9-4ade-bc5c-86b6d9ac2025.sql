-- Create function to grant admin role to a specific email after login
CREATE OR REPLACE FUNCTION public.grant_admin_if_allowed()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text;
  v_user_id uuid;
BEGIN
  -- Get current authenticated user id
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  -- Look up email from auth.users (read-only)
  SELECT email INTO v_email
  FROM auth.users
  WHERE id = v_user_id;

  -- Only this specific email is allowed to become admin
  IF v_email = 'info.muzammal.gbob@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;