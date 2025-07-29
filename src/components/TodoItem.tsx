import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Trash2, Calendar, Clock } from "lucide-react";
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

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
    return `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <Card 
      className={cn(
        "p-5 bg-gradient-card shadow-card border-0 transition-all duration-300 hover:shadow-soft group rounded-2xl mb-4",
        "hover:scale-102 hover:-translate-y-1",
        todo.completed && "opacity-75",
        isDeleting && "scale-95 opacity-0",
        isOverdue && "ring-2 ring-destructive/30"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "p-0 h-7 w-7 rounded-full transition-all duration-200 hover:bg-transparent",
              todo.completed && "text-primary"
            )}
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed ? (
              <Heart className="h-6 w-6 animate-check text-primary fill-current" />
            ) : (
              <HeartOff className="h-6 w-6 hover:text-primary/70 transition-colors" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-base font-medium transition-all duration-200 leading-relaxed",
              todo.completed && "line-through text-muted-foreground"
            )}>
              {todo.text}
            </p>
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

        {/* Dates */}
        <div className="flex flex-col gap-2 pl-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Created {formatDate(todo.createdAt)}
          </div>
          
          {todo.dueDate && (
            <div className={cn(
              "flex items-center gap-2 text-xs font-medium",
              isOverdue ? "text-destructive" : "text-primary",
            )}>
              <Calendar className="h-3 w-3" />
              {formatDueDate(todo.dueDate)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};