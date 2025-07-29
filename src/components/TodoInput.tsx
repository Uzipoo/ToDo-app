import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <Card className={cn(
      "p-4 bg-gradient-card shadow-card border-0 transition-all duration-300",
      isFocused && "shadow-glow ring-2 ring-primary/20"
    )}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            className="border-0 bg-background/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
          {text && (
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50 animate-pulse" />
          )}
        </div>
        <Button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-soft",
            !text.trim() && "opacity-50 hover:scale-100"
          )}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </form>
    </Card>
  );
};