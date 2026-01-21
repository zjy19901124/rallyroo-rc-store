-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price_aud DECIMAL(10,2) NOT NULL,
  compare_at_price_aud DECIMAL(10,2),
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  age_grade TEXT NOT NULL DEFAULT '8+',
  battery_type TEXT NOT NULL DEFAULT 'AA',
  dimensions_cm JSONB NOT NULL DEFAULT '{"length": 0, "width": 0, "height": 0}',
  weight_kg DECIMAL(5,2) NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Off-road',
  is_active BOOLEAN NOT NULL DEFAULT true,
  stripe_payment_link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipping_flat_rate_aud DECIMAL(10,2) NOT NULL DEFAULT 9.95,
  free_shipping_threshold_aud DECIMAL(10,2) NOT NULL DEFAULT 99,
  support_email TEXT NOT NULL DEFAULT 'support@rallyroo.com.au',
  dispatch_time_text TEXT NOT NULL DEFAULT '1-2 business days',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_sessions table for simple password auth
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Products: Public read for active products
CREATE POLICY "Anyone can view active products"
ON public.products FOR SELECT
USING (is_active = true);

-- Products: Full access for admin (via RPC function)
CREATE POLICY "Admin can manage all products"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- Site Settings: Public read
CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT
USING (true);

-- Site Settings: Full access for admin
CREATE POLICY "Admin can manage site settings"
ON public.site_settings FOR ALL
USING (true)
WITH CHECK (true);

-- Admin Sessions: Full access
CREATE POLICY "Manage admin sessions"
ON public.admin_sessions FOR ALL
USING (true)
WITH CHECK (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (shipping_flat_rate_aud, free_shipping_threshold_aud, support_email, dispatch_time_text)
VALUES (9.95, 99, 'support@rallyroo.com.au', '1-2 business days');

-- Seed 10 placeholder products
INSERT INTO public.products (name, slug, price_aud, compare_at_price_aud, description, features, age_grade, battery_type, dimensions_cm, weight_kg, images, category, is_active) VALUES
('RallyRoo Outback Crawler', 'outback-crawler', 89.95, 109.95, 'Conquer the toughest Aussie terrain with this rugged 4WD crawler. Built for adventure, designed for durability.', ARRAY['4WD independent suspension', 'Waterproof electronics', 'Metal chassis', '2.4GHz remote control', '30-minute run time'], '8+', 'AA', '{"length": 32, "width": 18, "height": 15}', 0.85, ARRAY['/placeholder.svg'], 'Off-road', true),
('RallyRoo Desert Storm', 'desert-storm', 129.95, NULL, 'High-speed desert racing action. This beast tears through sand and dirt with unmatched power.', ARRAY['Top speed 35km/h', 'Shock absorbers', 'LED headlights', 'Rechargeable battery pack', 'Dust-resistant design'], '14+', 'AA', '{"length": 38, "width": 22, "height": 14}', 1.2, ARRAY['/placeholder.svg'], 'Off-road', true),
('RallyRoo Drift King', 'drift-king', 79.95, 99.95, 'Master the art of drifting with smooth 360-degree spins and precision control.', ARRAY['Drift wheels included', '360° rotation', 'LED underglow', 'Rechargeable battery', '2.4GHz controller'], '8+', 'AA', '{"length": 28, "width": 16, "height": 10}', 0.65, ARRAY['/placeholder.svg'], 'Drift', true),
('RallyRoo Stunt Flipper', 'stunt-flipper', 69.95, NULL, 'Flip, roll, and tumble! This stunt truck keeps going no matter which way it lands.', ARRAY['Double-sided driving', 'Flip action', 'Durable shell', 'USB charging', 'Indoor/outdoor use'], '8+', 'AA', '{"length": 24, "width": 20, "height": 12}', 0.55, ARRAY['/placeholder.svg'], 'Stunt', true),
('RallyRoo Rock Buster', 'rock-buster', 149.95, 179.95, 'The ultimate rock climbing machine. Tackle boulders and steep inclines with ease.', ARRAY['6-wheel drive', 'Flexible chassis', 'High-torque motors', 'LED lights', 'Metal gears'], '14+', 'AA', '{"length": 42, "width": 26, "height": 18}', 1.8, ARRAY['/placeholder.svg'], 'Off-road', true),
('RallyRoo Speed Demon', 'speed-demon', 109.95, NULL, 'Pure speed. Built for the track, this racer hits top speeds for ultimate thrills.', ARRAY['Top speed 40km/h', 'Aerodynamic body', 'Racing tyres', 'Proportional steering', 'Quick-charge battery'], '14+', 'AA', '{"length": 36, "width": 18, "height": 11}', 0.95, ARRAY['/placeholder.svg'], 'Drift', true),
('RallyRoo DIY Builder Kit', 'diy-builder-kit', 59.95, NULL, 'Build your own RC truck from scratch! Perfect for young engineers and hobbyists.', ARRAY['100+ pieces', 'Tools included', 'Step-by-step guide', 'Customisable design', 'Educational STEM toy'], '8+', 'AA', '{"length": 26, "width": 14, "height": 12}', 0.45, ARRAY['/placeholder.svg'], 'DIY', true),
('RallyRoo Monster Masher', 'monster-masher', 119.95, 139.95, 'Big wheels, big power! Crush obstacles and dominate any terrain.', ARRAY['Oversized tyres', 'High ground clearance', 'Metal axles', 'Impact-resistant body', 'Long range control'], '8+', 'AA', '{"length": 34, "width": 28, "height": 22}', 1.4, ARRAY['/placeholder.svg'], 'Off-road', true),
('RallyRoo Turbo Twister', 'turbo-twister', 74.95, NULL, 'Spin, twist, and race with this agile performer. Perfect for tight spaces and quick manoeuvres.', ARRAY['Turbo boost', 'Quick steering', 'Compact design', 'USB rechargeable', 'LED indicators'], '8+', 'AA', '{"length": 22, "width": 14, "height": 10}', 0.5, ARRAY['/placeholder.svg'], 'Stunt', true),
('RallyRoo Pro Builder Advanced', 'pro-builder-advanced', 99.95, 119.95, 'Advanced DIY kit for serious builders. Create a competition-ready RC truck.', ARRAY['200+ pieces', 'Metal components', 'Detailed manual', 'Upgrade parts included', 'Competition specs'], '14+', 'AA', '{"length": 35, "width": 20, "height": 16}', 0.75, ARRAY['/placeholder.svg'], 'DIY', true);