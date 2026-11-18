import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
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


  useEffect(() => {
    const link = 'https://jsonplaceholder.typicode.com/todos';

    fetch(link)
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      const apiTasks = data.map((task:
         { id: number; 
          title: string; 
          completed: boolean; }) => {
        return {
          id: task.id,
          description: task.title,
          completed: task.completed,
          createdAt: new Date()
        };
      });
      setTasks(apiTasks);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    })
  },[])

  function addTask(value: string) {
    const newTask = {
      id: tasks.length + 1,
      description: value,
      completed: false,
      createdAt: new Date()
    }

    setTasks((prev) => [...prev, newTask]);
  }

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


  const [filter, setFilter] = useState('all');
  function filterTask() {

    if(filter ==='active') {
      return (
          tasks.filter(task => {
          return !task.completed;
        })
        )
    } 
    if (filter ==='completed') {
      return (
          tasks.filter(task => {
          return task.completed;
        })
      )
    }
    return tasks;
  }

  const unfinishedTasks = () => {
    return tasks.filter((task) => !task.completed)
  }

  const incomplete = unfinishedTasks().length;

  const clearCompleted = () => setTasks(unfinishedTasks());

  return (
    <section className="todoapp">
      <NewTaskForm onAdd = {addTask}/>
      <section className="main">
        <TaskList
          tasks={filterTask()}
          onToggle={toggleTask}
          onEdit={startEditing}
          onSave={saveTask}
          onDelete={deleteTask}

        />
        <Footer 
        filter={filter} 
        setFilter={setFilter} 
        incomplete = {incomplete}
        clearCompleted = {clearCompleted}
        />
      </section>
    </section>
  );
}

export default App;