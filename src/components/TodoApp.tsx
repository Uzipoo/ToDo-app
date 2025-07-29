import { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { TodoFilters } from "./TodoFilters";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Heart, Sparkles } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Convert date strings back to Date objects
      const todosWithDates = parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
      setTodos(todosWithDates);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, dueDate?: Date) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      dueDate,
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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-pink-sunburst-bg bg-cover bg-center bg-no-repeat p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-8 w-8 text-primary fill-current" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              My Pink Tasks
            </h1>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Organize your life beautifully ✨
          </p>
        </div>

        {/* Add Task Input */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters */}
        {totalCount > 0 && (
          <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
          </div>
        )}

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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 animate-bounce-in col-span-full">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {filter === 'completed' ? 'No completed tasks' : 
                 filter === 'active' ? 'No active tasks' : 'No tasks yet'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {filter === 'all' ? 'Add a task above to get started!' : 
                 `Switch to another filter to see ${filter === 'completed' ? 'active' : 'completed'} tasks`}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className="break-inside-avoid animate-slide-up"
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