-- Add stock management columns to products table
ALTER TABLE public.products
ADD COLUMN sku text,
ADD COLUMN stock_on_hand integer NOT NULL DEFAULT 0,
ADD COLUMN stock_reserved integer NOT NULL DEFAULT 0,
ADD COLUMN low_stock_threshold integer NOT NULL DEFAULT 5;

-- Create a generated column for stock_available
ALTER TABLE public.products
ADD COLUMN stock_available integer GENERATED ALWAYS AS (stock_on_hand - stock_reserved) STORED;

-- Add an index for SKU lookups
CREATE INDEX idx_products_sku ON public.products(sku) WHERE sku IS NOT NULL;