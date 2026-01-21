import { Link } from "react-router-dom";
import { Mail, MapPin, Shield, Truck, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Trust Badges */}
      <div className="border-b border-border py-8">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Secure Checkout</p>
                <p className="text-sm text-muted-foreground">SSL encrypted payments</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">AU Shipping</p>
                <p className="text-sm text-muted-foreground">Fast nationwide delivery</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 sm:justify-end">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eucalyptus-light">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Fast Dispatch</p>
                <p className="text-sm text-muted-foreground">1-2 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-xl font-bold text-primary">Rally</span>
              <span className="text-xl font-bold text-foreground">Roo</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Australia's home for quality RC trucks. Adventure starts here.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Off-road" className="text-sm text-muted-foreground hover:text-primary">
                  Off-road
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Drift" className="text-sm text-muted-foreground hover:text-primary">
                  Drift
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Stunt" className="text-sm text-muted-foreground hover:text-primary">
                  Stunt
                </Link>
              </li>
              <li>
                <Link to="/shop?category=DIY" className="text-sm text-muted-foreground hover:text-primary">
                  DIY Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-6">
        <div className="section-container">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RallyRoo. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Made with ❤️ in Australia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
