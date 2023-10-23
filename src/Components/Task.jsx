import React from 'react'
import './Task.css';
import { useState } from 'react';

const Task = () => {
    const initialState = {
      author: '',
      task1: '',
      task2: '',
      task3: '',
    };
  
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [formData, setFormData] = useState(initialState);

    
    const [errors, setErrors] = useState({})
  
    const { author, task1, task2, task3 } = formData;
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors('');
    };



    const validateForm = () =>{
        let newErrors = {};
    
        if (!author) {
          newErrors.author = 'Author is required';
        }
    
        if (!task1) {
          newErrors.task1 = 'First task is required';
        }
    
        if (!task2) {
          newErrors.task2 = 'Second task is required';
        }
    
        if (!task3) {
          newErrors.task3 = 'Third task is required';
        }
       
        setErrors(newErrors );
    
        return Object.keys(newErrors ).length === 0;
      };
  
    const handleAdd = () => {
      if (validateForm()) {
        const newTask = {
          id: Date.now(),
          author,
          task1,
          task2,
          task3,
        };
  
        setTasks([...tasks, newTask]);
        console.log ([...tasks, newTask]);
        setFormData(initialState);
      }
    };
  
    const handleDelete = (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    };
  
    const handleEdit = (id) => {
      setEditTaskId(id);
      const taskToEdit = tasks.find((task) => task.id === id);
      setFormData({
        author: taskToEdit.author,
        task1: taskToEdit.task1,
        task2: taskToEdit.task2,
        task3: taskToEdit.task3,
      });
    };
  
    const handleUpdate = () => {
        if (validateForm()) {
          const updatedTasks = tasks.map((task) => {
            if (task.id === editTaskId) {
              return {
                ...task,
                author,
                task1,
                task2,
                task3,
              };
            }
            return task;
          });
          setTasks(updatedTasks);
          setFormData(initialState);
          setEditTaskId(null);
        }
      };
  
  
  return (
    <div className="task-container">
      <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        {errors.author && <span className='error'>{errors.author}</span>}
        
        <div className="input-container">
          <input
            type="text"
            placeholder="Tasks-one"
            name="task1"
            value={task1}
            onChange={handleChange}
          />
        </div>
        {errors.task1 && <span className='error'>{errors.task1}</span>}

        <div className="input-container">
          <input
            type="text"
            placeholder="Tasks-two"
            name="task2"
            value={task2}
            onChange={handleChange}
          />
        </div>
        {errors.task2 && <span className='error'>{errors.task2}</span>}

        <div className="input-container">
          <input
            type="text"
            placeholder="Tasks-three"
            name="task3"
            value={task3}
            onChange={handleChange}
          />
          {editTaskId ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={handleAdd} className="bull">
              Add
            </button>
          )}
        </div>
        {errors.task3 && <span className='error'>{errors.task3}</span>}

      <div className="task">
          {tasks.map((task) => (
            <div key={task.id}>
              <ul>
                <li>AUTHOR: {task.author}</li>
                <li>TASK 1: {task.task1}</li>
                <li>TASK 2: {task.task2}</li>
                <li>TASK 3: {task.task3}</li>
              </ul>
              <div className="button-container">
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleEdit(task.id)}>Edit</button>
              </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Task;