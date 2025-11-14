-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  image_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create admin table to track which users are admins
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can view
CREATE POLICY "products_select_all"
  ON public.products FOR SELECT
  USING (true);

-- Products: Only admins can insert
CREATE POLICY "products_insert_admin"
  ON public.products FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));

-- Products: Only admins can update
CREATE POLICY "products_update_admin"
  ON public.products FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));

-- Products: Only admins can delete
CREATE POLICY "products_delete_admin"
  ON public.products FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid()));

-- Admins: Only admins can view admin table
CREATE POLICY "admins_select_own"
  ON public.admins FOR SELECT
  USING (auth.uid() = id);
