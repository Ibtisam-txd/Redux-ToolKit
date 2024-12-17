import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useGetTodosQuery } from "../features/todo/api/apiSlice";

function Todos() {
  // Ensure the correct path to the todos state
  const todos = useSelector((state) => state.todos.todos); // Adjusted path to todos state
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const { data, isLoading, isError } = useGetTodosQuery();

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id, newText: editText }));
    setEditId(null);
    setEditText("");
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {/* Ensure todos is an array */}
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <li
              className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
              key={todo.id}
            >
              {editId === todo.id ? (
                <input
                  type="text"
                  className="text-black px-2 py-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <div className="text-white">{todo.text}</div>
              )}

              <div className="flex space-x-2">
                {editId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-white bg-gray-500 border-0 py-1 px-4 focus:outline-none hover:bg-gray-600 rounded text-md"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div>
        <h3>Posts:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching posts.</p>
        ) : (
          <ul>
            {data && data.length > 0 ? (
              data.map((post) => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </li>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default Todos;
