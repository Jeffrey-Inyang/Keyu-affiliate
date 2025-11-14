-- Drop existing policies
DROP POLICY IF EXISTS "products_insert_admin" ON products;
DROP POLICY IF EXISTS "products_update_admin" ON products;
DROP POLICY IF EXISTS "products_delete_admin" ON products;

-- Create new policies that work without strict auth
CREATE POLICY "products_insert_public" ON products
FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "products_update_public" ON products
FOR UPDATE TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "products_delete_public" ON products
FOR DELETE TO public
USING (true);

-- Keep the select policy as is (everyone can read)
-- The products_select_all policy already exists
