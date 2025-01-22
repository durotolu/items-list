import { SearchBar } from '@/components/SearchBar';
import { TaskCard } from '@/components/TaskCard';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { state, dispatch } = useTaskContext();

  const filteredTasks = state.tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Link to="/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </Link>
        </div>

        <SearchBar
          value={state.searchQuery}
          onChange={(value) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: value })
          }
        />

        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={(id) => dispatch({ type: 'TOGGLE_TASK', payload: id })}
              onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: id })}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No tasks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;