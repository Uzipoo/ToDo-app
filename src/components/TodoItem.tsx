import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Trash2, Calendar } from "lucide-react";
import { Todo } from "./TodoApp";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 200);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card 
      className={cn(
        "p-4 bg-gradient-card shadow-card border-0 transition-all duration-300 hover:shadow-soft group",
        todo.completed && "opacity-75",
        isDeleting && "scale-95 opacity-0"
      )}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 h-6 w-6 rounded-full transition-all duration-200 hover:bg-transparent",
            todo.completed && "text-primary"
          )}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <CheckCircle2 className="h-5 w-5 animate-check" />
          ) : (
            <Circle className="h-5 w-5 hover:text-primary/70" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-sm font-medium transition-all duration-200",
            todo.completed && "line-through text-muted-foreground"
          )}>
            {todo.text}
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formatDate(todo.createdAt)}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};