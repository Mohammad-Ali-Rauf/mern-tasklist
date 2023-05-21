import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

const EditTask = ({ taskId }) => {
  const [taskID, setTaskID] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      const response = await axios
        .patch(`${API_BASE_URL}/api/tasks/${taskId}`)
        .catch((error) => console.log('Error: ', error));
      setTaskID(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    }
    fetchTasks();
  }, [taskId]);

  const updateTask = async () => {
    try {
      const updatedTask = { title, description };
      await axios.patch(`${API_BASE_URL}/api/tasks/${taskId}`, updatedTask);
      console.log('Task updated Successfully');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={updateTask}>
        <input
          className='form-control mb-3'
          type='text'
          value={title}
          placeholder='new title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='form-control mb-3'
          type='text'
          value={description}
          placeholder='new description'
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-warning' type='submit'>Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
