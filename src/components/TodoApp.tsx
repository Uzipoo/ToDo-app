import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-glow/5 to-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            My Tasks
          </h1>
          <p className="text-muted-foreground">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Task Input */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Stats */}
        {totalCount > 0 && (
          <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-4 bg-gradient-card shadow-card border-0">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {completedCount} of {totalCount} tasks completed
                </span>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Circle className="h-3 w-3" />
                    {totalCount - completedCount} pending
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    {completedCount} done
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </Card>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 animate-bounce-in">
              <div className="mb-4">
                <CheckCircle2 className="h-16 w-16 text-muted-foreground/30 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No tasks yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Add a task above to get started!
              </p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};