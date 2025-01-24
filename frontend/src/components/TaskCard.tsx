import { Task } from '@/context/TaskContext';
import { cn } from '@/lib/utils';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold text-lg mb-2",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs",
                task.priority === "low" && "bg-priority-low/20 text-priority-low",
                task.priority === "medium" && "bg-priority-medium/20 text-priority-medium",
                task.priority === "high" && "bg-priority-high/20 text-priority-high"
              )}
            >
              {task.priority}
            </span>
            <span className="text-xs text-muted-foreground">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(task.id)}
            className={cn(
              "hover:text-primary",
              task.completed && "text-primary"
            )}
          >
            <CheckCircle2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="hover:text-destructive"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};