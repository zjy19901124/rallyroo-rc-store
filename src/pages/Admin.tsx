import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductForm } from "@/components/admin/ProductForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Lock, LogOut, ShieldAlert } from "lucide-react";
import { getStockStatus, type Product } from "@/hooks/useProducts";
import { StockBadge } from "@/components/products/StockBadge";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      fetchProducts();
    }
  }, [isLoading, isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch products");
    } else {
      setProducts(data as Product[]);
    }
    setLoadingProducts(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted");
      fetchProducts();
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout title="Admin">
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  // Not logged in - redirect to auth
  if (!user) {
    return (
      <Layout title="Admin Login">
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle>Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Please sign in with an admin account to access this page.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate("/auth", { state: { returnTo: "/admin" } })}
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <Layout title="Access Denied">
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <ShieldAlert className="mx-auto h-12 w-12 text-destructive mb-4" />
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Your account ({user.email}) does not have admin privileges.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Contact an administrator if you believe this is an error.
              </p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Admin dashboard
  return (
    <Layout title="Admin Dashboard">
      <div className="section-container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
          <div className="flex gap-2">
            <Button onClick={() => { setEditingProduct(null); setShowForm(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {loadingProducts ? (
          <p className="text-muted-foreground">Loading products...</p>
        ) : (
          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku || "—"}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price_aud.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <StockBadge status={stockStatus} />
                          <span className="text-xs text-muted-foreground">
                            {product.stock_available} available
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingProduct(product); setShowForm(true); }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct || undefined}
              onSuccess={handleFormSuccess}
              onCancel={() => { setShowForm(false); setEditingProduct(null); }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Admin;
