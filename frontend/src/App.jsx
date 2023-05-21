import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import EditTask from './EditTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`${API_BASE_URL}/api/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch tasks', error);
      });
  };

  const createTask = () => {
    axios
      .post(`${API_BASE_URL}/api/tasks`, { title, description })
      .then((response) => {
        const newTask = response.data;
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Failed to create task', error);
      });
  };

  const handleUpdateTask = (taskId) => {
    setUpdatingTaskId(taskId);
  };

  const deleteTask = async (taskId) => {
    axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`).catch((error) => {
      console.error('Failed to delete task', error);
    });
    setTasks(tasks.filter((task) => task._id !== taskId));
    console.log('Task deleted Successfully');
  };

  return (
    <>
      {
        <div className='container-fluid bg-light'>
          <h1 className='h1 text-secondary text-center mt-3'>Task List</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createTask();
            }}
          >
            <input
            className='form-control mb-3 mt-3'
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
            className='form-control mb-3'
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button className='btn btn-primary' type='submit'>Add Task</button>
          </form>

          <ul className='list-unstyled'>
            {tasks.map((task) => (
              <>
                <li key={task._id}>
                  <h3 className='mt-3 h3 text-left text-dark mb-3'>{task.title}: {'  '}
                  <span className='h5 text-success'>{task.description}</span></h3>
                  {updatingTaskId === task._id ? (
                    <EditTask taskId={task._id} />
                  ) : (
                    <>
                      <button className='btn btn-warning' onClick={() => handleUpdateTask(task._id)}>
                        Update Task
                      </button>
                      <button className='btn btn-danger ms-3' onClick={() => deleteTask(task._id)}>
                        Delete Task
                      </button>
                    </>
                  )}
                </li>
              </>
            ))}
          </ul>
        </div>
      }
    </>
  );
}

export default App;
