import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!isValidTile()) {
      console.log('You cannot creat a task with a empty title');
      return;
    }

    const newId = generateNewValidId();
    if (newId === 0) {
      console.log('It was not possible to generante a new id');
      return;
    }

    setTasks(tasks => [...tasks, {
      id: newId,
      title: newTaskTitle,
      isComplete: false
    }]);

  }

  function handleToggleTaskCompletion(taskId: number) {
    const updateTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setTasks(updateTasks);
  }

  function handleRemoveTask(taskId: number) {
    console.log(`Removing id: ${taskId}`);
    setTasks(tasks.filter(({ id }) => id !== taskId));
  }

  function isValidTile() {
    return newTaskTitle && newTaskTitle.length > 0;
  }

  function generateNewValidId() {
    let id = newId();
    const maxAttempt = Math.pow(100, 2);
    let attempt = 0;

    while (tasks.some(task => task.id == id)) {
      id = newId();
      attempt++;
      if (attempt >= maxAttempt) {
        id = 0;
        break;
      }
    }

    return id;
  }

  function newId() {
    const newId = Math.floor(Math.random() * Math.pow(100, 2)) + 1;
    return newId;
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}