import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterType } from "./TodoApp";
import { cn } from "@/lib/utils";
import { Heart, Clock, CheckCircle } from "lucide-react";

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFilters = ({ currentFilter, onFilterChange }: TodoFiltersProps) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: Heart },
    { key: 'active', label: 'Active', icon: Clock },
    { key: 'completed', label: 'Completed', icon: CheckCircle },
  ] as const;

  return (
    <Card className="p-4 bg-gradient-card shadow-card border-0 rounded-2xl">
      <div className="flex gap-2 justify-center">
        {filters.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={currentFilter === key ? "default" : "ghost"}
            size="sm"
            className={cn(
              "rounded-xl transition-all duration-200 flex items-center gap-2",
              currentFilter === key 
                ? "bg-gradient-primary text-primary-foreground shadow-soft scale-105" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            )}
            onClick={() => onFilterChange(key as FilterType)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>
    </Card>
  );
};