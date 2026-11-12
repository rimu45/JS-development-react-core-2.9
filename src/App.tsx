import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Completed task",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      description: "Editing task",
      completed: false,
      editing: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      description: "Active task",
      completed: false,
      createdAt: new Date(),
    },
  ]);

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  }

  function startEditing(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      })
    );
  }

  function saveTask(id: number, description: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            description: description,
            editing: false,
          };
        }
        return task;
      })
    );
  }

  function deleteTask (id: number) {
    setTasks(
      tasks.filter (task => {
        return (task.id !== id)
      })
    )
  }

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={startEditing}
          onSave={saveTask}
          onDelete={deleteTask}
        />
        <Footer />
      </section>
    </section>
  );
}

export default App;