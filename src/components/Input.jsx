import { useCallback, useEffect, useState } from "react";
import { StatesBar } from "./StatesBar";

export const Input = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [todo, setTodo] = useState("");

  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem("activeFilter") || "all";
  });

  const [count, setCount] = useState(todos.length);

  const [isHovered, setIsHovered] = useState(null);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleClick = () => {
    if (todo.trim()) {
      addTodo();
      setTodo("");
    }
  };

  const updateTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(updateTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    const filteredTodos = updatedTodos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const getFilteredTodos = useCallback(() => {
    switch (activeFilter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    localStorage.setItem("activeFilter", filter);
  };

  useEffect(() => {
    const filteredTodos = getFilteredTodos();
    setCount(filteredTodos.length);
  }, [todos, activeFilter, getFilteredTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Drag and drop
  const [draggedTodo, setDraggedTodo] = useState(null);

  const onDragStart = (todo) => {
    setDraggedTodo(todo);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (todo) => {
    const draggedTodoIndex = todos.indexOf(draggedTodo);
    const droppedTodoIndex = todos.indexOf(todo);

    const newTodos = [...todos];
    newTodos.splice(draggedTodoIndex, 1);
    newTodos.splice(droppedTodoIndex, 0, draggedTodo);

    setTodos(newTodos);
    setDraggedTodo(null);
  };

  return (
    <div>
      <label>
        <input
          value={todo}
          type="text"
          className="w-full rounded-md bg-card px-6 py-4 text-cardForeground outline-none placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cardForeground focus-visible:ring-offset-2"
          placeholder="Create a new todo..."
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
      </label>
      <ul className="my-5 max-h-[55vh] overflow-y-auto rounded-md bg-card text-cardForeground shadow-lg">
        {todos.length === 0 ? (
          <div className="flex items-center gap-4 border-b border-border px-6 py-4">
            <div className="size-6 rounded-full border border-border"></div>
            <p className="pt-0.5">New todo</p>
          </div>
        ) : (
          getFilteredTodos().map((todo) => (
            <li
              key={todo.id}
              draggable
              onDragStart={() => onDragStart(todo)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(todo)}
              onMouseEnter={() => setIsHovered(todo.id)}
              onMouseLeave={() => setIsHovered(null)}
              className="flex items-center justify-between border-b border-border px-6 py-4"
            >
              <label className="flex cursor-pointer items-center gap-4">
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => updateTodo(todo.id)}
                />
                <div
                  className={`${todo.completed && "bg-checked"} size-6 rounded-full bg-border p-[1px] hover:bg-checked`}
                >
                  <div
                    className={`${todo.completed && "bg-checked"} relative flex h-full w-full items-center justify-center rounded-full bg-card`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                        className="absolute left-1.5 top-[6px]"
                      >
                        <path
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <p
                  className={`pt-0.5 ${todo.completed && "text-foreground line-through"}`}
                >
                  {todo.text.charAt(0).toUpperCase() + todo.text.slice(1)}
                </p>
              </label>
              {isHovered === todo.id && (
                <button onClick={() => removeTodo(todo.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="cross"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
                </button>
              )}
            </li>
          ))
        )}
        <StatesBar
          count={count}
          handleTodoCompleted={handleTodoCompleted}
          id={todo.id}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleFilterChange={handleFilterChange}
        />
      </ul>
      <p className="mt-11 text-center">Drag and drop to reorder list</p>
    </div>
  );
};
