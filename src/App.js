import React, { useState } from 'react';

// To to list functionality:
// Add a new task
// Mark a task as completed
// Delete a task
// Edit a task
// Clear all tasks
// view all tasks

function App() {
  
  // add tasks and state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      isCompleted: false
    },
    {
      id: 2,
      name: 'Task 2',
      isCompleted: false
    },
    {
      id: 3,
      name: 'Task 3',
      isCompleted: false
    },
  ]);

  // conditional render the Add Task component
  const [showAddTask, setShowAddTask] = useState(false);

  // toggle the add task component
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  // add a new task
  const addTask = (taskName) => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
    setShowAddTask(false);
  }

  return (
    <div className="app">
      <h1>TO DO LIST! ✅</h1>
      <List tasks={tasks} setTasks={setTasks} />

      {!showAddTask && (
        <button onClick={toggleAddTask}>Add Task</button>
      )}

      {showAddTask && <AddTask addTask={addTask} />}
    </div>
  );
}

export default App;

// List component
function List({ tasks, setTasks }) {

  const handleCheckboxChange = (id) => {
    setTasks(tasks.map((task) => (
      task.id === id ? { ...task, isCompleted: !task.isCompleted} : task  // toggle the isCompleted value
    )))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => handleCheckboxChange(task.id)}
            id={`task${task.id}`}
          />
          <label htmlFor={`task${task.id}`}>{task.name}</label>
          <button>Edit</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// AddTask Component
function AddTask({ addTask }) {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task) {
      addTask(task);
      setTask('');
    }
  }

  return (
    <div className="add-task">
      <label htmlFor="">Add Task</label>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
    </div>
  )
}