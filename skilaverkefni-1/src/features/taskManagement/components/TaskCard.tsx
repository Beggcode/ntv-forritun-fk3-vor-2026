import type { Task } from '../../../shared/types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Task['status']) => void;
}

export const TaskCard = ({ task, onDelete, onUpdateStatus }: TaskCardProps) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px' }}>
      <h4>{task.title}</h4>
      <p>Priority: {task.priority}</p>
      <select 
        value={task.status} 
        onChange={(e) => onUpdateStatus(task.id, e.target.value as Task['status'])}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
};