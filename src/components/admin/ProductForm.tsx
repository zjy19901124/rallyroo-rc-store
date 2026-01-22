import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Product } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    price_aud: product?.price_aud || 0,
    compare_at_price_aud: product?.compare_at_price_aud || null,
    description: product?.description || "",
    features: product?.features?.join("\n") || "",
    age_grade: product?.age_grade || "8+",
    battery_type: product?.battery_type || "AA",
    dimensions_cm: product?.dimensions_cm || { length: 0, width: 0, height: 0 },
    weight_kg: product?.weight_kg || 0,
    images: product?.images || [],
    category: product?.category || "Off-road",
    is_active: product?.is_active ?? true,
    stripe_payment_link_url: product?.stripe_payment_link_url || "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        price_aud: formData.price_aud,
        compare_at_price_aud: formData.compare_at_price_aud || null,
        description: formData.description,
        features: formData.features.split("\n").filter(Boolean),
        age_grade: formData.age_grade,
        battery_type: formData.battery_type,
        dimensions_cm: formData.dimensions_cm,
        weight_kg: formData.weight_kg,
        images: formData.images,
        category: formData.category,
        is_active: formData.is_active,
        stripe_payment_link_url: formData.stripe_payment_link_url || null,
      };

      if (product) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (error) throw error;
        toast.success("Product updated successfully!");
      } else {
        const { error } = await supabase
          .from("products")
          .insert(productData);

        if (error) throw error;
        toast.success("Product created successfully!");
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
                slug: formData.slug || generateSlug(e.target.value),
              });
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price (AUD)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price_aud}
            onChange={(e) => setFormData({ ...formData, price_aud: parseFloat(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comparePrice">Compare At Price</Label>
          <Input
            id="comparePrice"
            type="number"
            step="0.01"
            value={formData.compare_at_price_aud || ""}
            onChange={(e) => setFormData({ ...formData, compare_at_price_aud: e.target.value ? parseFloat(e.target.value) : null })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Off-road">Off-road</SelectItem>
              <SelectItem value="Drift">Drift</SelectItem>
              <SelectItem value="Stunt">Stunt</SelectItem>
              <SelectItem value="DIY">DIY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          rows={4}
          placeholder="4WD suspension system&#10;Waterproof electronics&#10;2.4GHz remote control"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ageGrade">Age Grade</Label>
          <Select value={formData.age_grade} onValueChange={(value) => setFormData({ ...formData, age_grade: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8+">8+</SelectItem>
              <SelectItem value="14+">14+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="batteryType">Battery Type</Label>
          <Select value={formData.battery_type} onValueChange={(value) => setFormData({ ...formData, battery_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AA">AA</SelectItem>
              <SelectItem value="AAA">AAA</SelectItem>
              <SelectItem value="9V">9V</SelectItem>
              <SelectItem value="LiPo">LiPo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <Label>Length (cm)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.dimensions_cm.length}
            onChange={(e) => setFormData({
              ...formData,
              dimensions_cm: { ...formData.dimensions_cm, length: parseFloat(e.target.value) }
            })}
          />
        </div>
        <div className="space-y-2">
          <Label>Width (cm)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.dimensions_cm.width}
            onChange={(e) => setFormData({
              ...formData,
              dimensions_cm: { ...formData.dimensions_cm, width: parseFloat(e.target.value) }
            })}
          />
        </div>
        <div className="space-y-2">
          <Label>Height (cm)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.dimensions_cm.height}
            onChange={(e) => setFormData({
              ...formData,
              dimensions_cm: { ...formData.dimensions_cm, height: parseFloat(e.target.value) }
            })}
          />
        </div>
        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.weight_kg}
            onChange={(e) => setFormData({ ...formData, weight_kg: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Product Images</Label>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => setFormData({ ...formData, images })}
          productSlug={formData.slug || "new-product"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stripeUrl">Stripe Payment Link URL</Label>
        <Input
          id="stripeUrl"
          value={formData.stripe_payment_link_url}
          onChange={(e) => setFormData({ ...formData, stripe_payment_link_url: e.target.value })}
          placeholder="https://buy.stripe.com/..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="isActive"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
        />
        <Label htmlFor="isActive">Product is active</Label>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            product ? "Update Product" : "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
}
