import { Button } from "@/components/ui/button";

const categories = ["All", "Off-road", "Drift", "Stunt", "DIY"];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
          className="transition-all"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
