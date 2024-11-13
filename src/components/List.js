import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Finish Homework',
      details: 'Complete the math homework and submit by 5 PM.',
      showDetails: false,
      status: 'upcoming',
      imageUrl:
        'https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg',
    },
    {
      id: 2,
      text: 'Buy Groceries',
      details: 'Buy eggs, milk, and vegetables from the store.',
      showDetails: false,
      status: 'success',
      imageUrl:
        'https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg',
    },
    {
      id: 3,
      text: 'Visit Doctor',
      details: 'Appointment with the doctor at 3 PM.',
      showDetails: false,
      status: 'failed',
      imageUrl:
        'https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg',
    },
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [isModalOpenAddList, setIsModalOpenAddList] = useState(false);
  const [isModalOpenEditTask, setIsModalOpenEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      if (!taskInput || !taskDetails) {
        alert('Please fill in all fields');
        return;
      } else {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            text: taskInput,
            completed: false,
            details: taskDetails,
            showDetails: false,
            status: 'upcoming',
            imageUrl,
          },
        ]);
      }
      setTaskInput('');
      setTaskDetails('');
      setImage(null);
      setImageUrl(null);
      setIsModalOpenAddList(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const editTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id
        ? {
            ...task,
            text: taskInput,
            details: taskDetails,
            imageUrl,
            status: selectedTask.status,
          }
        : task
    );
    setTaskInput('');
    setTaskDetails('');
    setImage(null);
    setImageUrl(null);
    setTasks(updatedTasks);
    setIsModalOpenEditTask(false);
    setSelectedTask(null);
  };

  const openModalView = (task) => {
    setSelectedTask(task);
    setIsModalOpenView(true);
  };

  const closeModalView = () => {
    setIsModalOpenView(false);
    setSelectedTask(null);
  };

  const openModalAddList = () => {
    setIsModalOpenAddList(true);
  };

  const closeModalAddList = () => {
    setIsModalOpenAddList(false);
    setSelectedTask(null);
  };

  const openModalEditTask = (task) => {
    setSelectedTask(task);
    setTaskInput(task.text);
    setTaskDetails(task.details);
    setImageUrl(task.imageUrl);
    setIsModalOpenEditTask(true);
  };

  const closeModalEditTask = () => {
    setIsModalOpenEditTask(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">List</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-2/3"
        />
      </div>
      <button
        onClick={openModalAddList}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>

      <br />
      <br />
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 border rounded-md ${
              task.completed ? 'bg-gray-200 line-through' : 'bg-white'
            }`}
          >
            <div className="px-6 flex justify-between items-center">
              <span className="px-1">{task.text}</span>
              <span
                className={`px-1 status ${
                  task.status === 'upcoming' ? 'status-upcoming' : ''
                } ${task.status === 'success' ? 'status-success' : ''} ${
                  task.status === 'failed' ? 'status-failed' : ''
                }`}
              >
                {task.status}
              </span>
            </div>
            <br />
            <div className="px-6 flex justify-between items-center">
              <div className="px-1">
                <button
                  className="status-success text-white"
                  onClick={() => openModalView(task)}
                >
                  <span className="text-white">View</span>
                </button>
              </div>
              <div className="px-1">
                <button onClick={() => openModalEditTask(task)}>
                  <span className="text-white">Edit</span>
                </button>
              </div>
              <div className="px-1">
                <button
                  className="status-failed "
                  onClick={() => deleteTask(task.id)}
                >
                  <span className="text-white">Delete Task</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <h1 className="text-3xl font-bold text-center mb-6">End List</h1>

      {isModalOpenView && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <div className="mx-2 w-4/5 mb-4 flex items-center">
              <h2 className="text-xl font-bold mb-4">{selectedTask.text}</h2>
              <span
                className={`mb-4 status ${
                  selectedTask.status === 'upcoming' ? 'status-upcoming' : ''
                } ${
                  selectedTask.status === 'success' ? 'status-success' : ''
                } ${selectedTask.status === 'failed' ? 'status-failed' : ''}`}
              >
                {selectedTask.status}
              </span>
            </div>
            {selectedTask && selectedTask.imageUrl ? (
              <div className="flex justify-between items-center">
                <div className="px-2 w-1/5 mb-4">
                  <img
                    src={selectedTask.imageUrl}
                    alt="Task"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="px-2 w-4/5 mb-4">
                  <p>{selectedTask.details}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="px-2">
                  <p>{selectedTask.details}</p>
                </div>
                <br />
                <p className="px-2">No Image Yet.</p>
              </>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={closeModalView}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpenAddList && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add List</h2>
            <input
              type="text"
              placeholder="Add a new List"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <textarea
              placeholder="Add details for the list (optional)"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl ? (
              <div>
                <h3>Image Preview</h3>
                <img src={imageUrl} alt="Preview" width="100" />
              </div>
            ) : (
              <p>No Image Yet.</p>
            )}
            <button onClick={addTask}>Add List</button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={closeModalAddList}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpenEditTask && selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && <img src={imageUrl} alt="Task" width="100" />}
            <div>
              <select
                value={selectedTask.status}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, status: e.target.value })
                }
              >
                <option value="upcoming">Upcoming</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <br />
            <button onClick={editTask}>Update Task</button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={closeModalEditTask}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
