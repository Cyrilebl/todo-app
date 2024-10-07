export const StatesBar = ({
  count,
  handleTodoCompleted,
  id,
  activeFilter,
  handleFilterChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 px-5 py-3 text-foreground max-sm:grid-rows-2">
      <p className="sm:col-start-1">
        <span>{count}</span> items left
      </p>
      <div className="flex justify-center gap-6 text-secondaryForeground max-sm:col-span-3 max-sm:row-start-2 sm:col-start-2">
        <button
          className={`hover-text ${activeFilter === "all" ? "text-active hover:text-active" : ""}`}
          onClick={() => {
            handleFilterChange("all");
          }}
        >
          All
        </button>
        <button
          className={`hover-text ${activeFilter === "active" ? "text-active hover:text-active" : ""}`}
          onClick={() => {
            handleFilterChange("active");
          }}
        >
          Active
        </button>
        <button
          className={`hover-text ${activeFilter === "completed" ? "text-active hover:text-active" : ""}`}
          onClick={() => {
            handleFilterChange("completed");
          }}
        >
          Completed
        </button>
      </div>
      <button
        className="hover-text justify-self-end max-sm:col-span-2 sm:col-start-3"
        onClick={() => handleTodoCompleted(id)}
      >
        Clear Completed
      </button>
    </div>
  );
};
