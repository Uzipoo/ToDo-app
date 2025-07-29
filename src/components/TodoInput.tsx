
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoInputProps {
  onAdd: (text: string, dueDate?: Date) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with text:", text);
    if (text.trim()) {
      const dueDateObj = dueDate ? new Date(dueDate) : undefined;
      console.log("Adding todo:", text.trim(), dueDateObj);
      onAdd(text.trim(), dueDateObj);
      setText("");
      setDueDate("");
    } else {
      console.log("Text is empty, not adding todo");
    }
  };

  return (
    <Card className={cn(
      "p-6 bg-gradient-card shadow-card border-0 transition-all duration-300 rounded-2xl",
      isFocused && "shadow-glow ring-2 ring-primary/20"
    )}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What beautiful thing will you accomplish? ✨"
            className={cn(
              "border-2 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground text-lg py-3 rounded-xl transition-all duration-200 cursor-text",
              isFocused ? "border-primary/50 bg-white shadow-lg" : "border-primary/20 hover:border-primary/30"
            )}
            autoFocus
          />
          {text && (
            <Heart className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50 animate-pulse fill-current" />
          )}
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border-2 border-primary/20 bg-background/30 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 text-foreground pl-10 rounded-xl cursor-pointer transition-all duration-200"
            placeholder="Due date (optional)"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "w-full bg-gradient-primary hover:scale-105 transition-all duration-200 shadow-soft rounded-xl py-3 text-lg font-medium cursor-pointer",
            !text.trim() && "opacity-50 hover:scale-100 cursor-not-allowed"
          )}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Beautiful Task
        </Button>
      </form>
    </Card>
  );
};
