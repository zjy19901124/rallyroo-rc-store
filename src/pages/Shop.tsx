import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { useProducts } from "@/hooks/useProducts";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const [category, setCategory] = useState(categoryParam);

  const { data: products, isLoading } = useProducts(
    category === "All" ? undefined : category
  );

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (newCategory === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", newCategory);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout
      title="Shop RC Trucks"
      description="Browse our full range of RC trucks. Off-road crawlers, drift machines, stunt trucks, and DIY kits. Fast Australian shipping."
    >
      {/* Header */}
      <section className="bg-muted py-12 md:py-16">
        <div className="section-container">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Shop All RC Trucks
          </h1>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Browse our complete range of premium RC trucks. Built tough for
            Australian conditions, backed by quality and fast shipping.
          </p>
          <CategoryFilter selected={category} onChange={handleCategoryChange} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading..."
                : `${products?.length || 0} products found`}
            </p>
          </div>
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
