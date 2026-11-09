
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css'

function App() {
  const tasks = [
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
  ]

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList tasks = {tasks} />
        <Footer />
      </section>
    </section>
  )
}

export default App
