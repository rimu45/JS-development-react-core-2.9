import { useState } from 'react';

interface NewTaskFormProps {
  onAdd: (description: string) => void;
}

function NewTaskForm({ onAdd }: NewTaskFormProps) {
  const [description, setDescription] = useState('');
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(event) => {
          if(event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
            onAdd(event.currentTarget.value);
            setDescription('');
          }
        }}
      />
    </header>
  );
}
export default NewTaskForm;
