import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const category = CATEGORIES.find(c => c.id === task.category);
  const overdue = isOverdue(task.dueDate, task.completed);
  const dueDateLabel = getDueDateLabel(task.dueDate);

  const handleToggleComplete = async (e) => {
    e.preventDefault(); // Evitar que el Link navegue
    e.stopPropagation();
    await updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div className={`card hover:shadow-lg transition-shadow ${
        task.completed ? 'opacity-60' : ''
      } ${
        overdue ? 'border-2 border-red-400' : ''
      }`}>
        <div className="flex justify-between items-start">
          {/* Contenido principal */}
          <div className="flex-1">
            {/* Título */}
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>

            {/* Descripción */}
            {task.description && (
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {/* Categoría */}
              {category && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}>
                  {category.label}
                </span>
              )}

              {/* Estado */}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.completed ? 'Completada' : 'Pendiente'}
              </span>

              {/* Fecha de vencimiento */}
              {dueDateLabel && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  overdue
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {overdue ? 'Vencida' : `Vence: ${dueDateLabel}`}
                </span>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                task.completed
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {task.completed ? 'Deshacer' : 'Completar'}
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
