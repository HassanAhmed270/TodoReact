import { useState, useRef, useEffect } from 'react';
import Navbar from './components/navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false); // ✅ proper state
  const ref = useRef();

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Store todos in localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!task.trim()) return; // Prevent empty tasks

    if (editId) {
      // Update existing todo
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === editId ? { ...todo, title: task } : todo
        )
      );
      setEditId(null);
    } else {
      // Add new todo
      setTodos(prevTodos => [
        ...prevTodos,
        { id: uuidv4(), title: task, isCompleted: false },
      ]);
    }

    setTask('');
    ref.current.focus();
  };

  const handleUpdate = (e) => {
    const id = e.target.getAttribute('data-id');
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      setTask(todo.title);
      setEditId(todo.id);
      ref.current.focus();
    }
  };

  const handleDelete = (e) => {
    const id = e.target.getAttribute('data-id');
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleChange = (e) => {
    const id = e.target.name;
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // ✅ Decide what to display based on checkbox
  const displayedTodos = showCompleted
    ? todos.filter(item => item.isCompleted)
    :  todos.filter(item => item.isCompleted===false)

  return (
    <>
      <Navbar />
      <div className="container w-full bg-indigo-900/20 h-screen rounded-xl p-4  md:mx-auto md:my-4 item-center">
        <div className="font-bold text-sm rounded-xl">
          <div className="todo bg-indigo-900/5 mx-auto  w-full md:w-[500px] p-4 mt-10 rounded-xl">
            <h1 className="text-3xl text-center">TODO LIST</h1>

            {/* Input section */}
            <div className="add flex flex-col text-lg font-semibold">
              <input
                ref={ref}
                className="px-2 py-1 mt-3 mb-2 md:mt-1"
                name="task"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add task"
              />
              <button
                
                disabled={task.length<3}
                onClick={handleAdd}
                className="btn bg-indigo-600 text-white w-[100px] my-2 rounded-md hover:bg-indigo-700"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>

            {/* Toggle show completed */}
            <div className="text-lg showComplete flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
              />
              <h1 className='text-lg'>Show Completed Tasks</h1>
            </div>

            {/* Todo list */}
            <div className="todo item-center flex flex-col gap-2 mt-4">
              {displayedTodos.length === 0 && (
                <div>No item to display</div>
              )}

              {displayedTodos.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-indigo-200 px-3 py-1 rounded-md"
                >
                  <div className="input">
                    <input
                      type="checkbox"
                      className="chkbox"
                      name={item.id}
                      checked={item.isCompleted}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={item.isCompleted ? 'text-gray-500 line-through' : ''}>
                    {item.title}
                  </div>
                  <div className="btns flex gap-2">
                    <button
                      data-id={item.id}
                      onClick={handleUpdate}
                      className="edit bg-indigo-600 rounded-md text-white px-2 py-1 hover:bg-indigo-700"
                    >
                      Edit
                    </button>
                    <button
                      data-id={item.id}
                      onClick={handleDelete}
                      className="delete bg-red-600 rounded-md text-white px-2 py-1 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
