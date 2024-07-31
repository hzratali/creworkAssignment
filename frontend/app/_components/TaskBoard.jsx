import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { IoMdAdd } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import NewTaskModal from "./NewTaskModal";
import { instance } from "../axiosConfig";

const initialTasks = {
  todo: [],
  inProgress: [],
  underReview: [],
  finished: [],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ create: false, status: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateTask, setUpdateTask] = useState({});

  const populateUpdate = (task) => {
    setUpdateTask(task);
    setUpdate(true);
    setIsModalOpen(true);
  };

  const populateNewTask = (status) => {
    setNewTask({ create: true, status });
    setIsModalOpen(true);
  };

  const resetUpdate = () => {
    setUpdateTask({});
    setUpdate(false);
  };

  const resetNewTask = () => {
    setNewTask({ create: false, status: "" });
  };

  const transformTasks = (tasks) => {
    const todo = [],
      inProgress = [],
      underReview = [],
      finished = [];

    const newTasks = {
      todo,
      inProgress,
      underReview,
      finished,
    };

    tasks.map((task) => {
      switch (task.status) {
        case "todo":
          todo.push(task);
          break;
        case "inProgress":
          inProgress.push(task);
          break;
        case "underReview":
          underReview.push(task);
          break;
        case "finished":
          finished.push(task);
          break;
      }
    });
    return newTasks;
  };

  const headings = {
    todo: "To do",
    inProgress: "In progress",
    underReview: "Under review",
    finished: "Finished",
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetUpdate();
    resetNewTask();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    moveTask(removed.id, destination.droppableId);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const createTask = async (taskObject) => {
    const { title, description, priority, status, deadline } = taskObject;

    if (!title || !status) return;

    try {
      const response = await instance.post("/tasks", {
        title,
        description,
        priority,
        status,
        deadline,
      });
      getTasks();
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      await instance.patch(`/tasks/${taskId}`, {
        status: newStatus,
      });
      getTasks();
    } catch (error) {}
  };

  const updateTaskData = async (taskObject) => {
    const { title, description, priority, status, deadline } = taskObject;
    const id = updateTask.taskId;
    if (!title || !status) return;

    try {
      const response = await instance.patch(`/tasks/${id}`, {
        title,
        description,
        priority,
        status,
        deadline,
      });
      getTasks();
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const DeleteTaskData = async (e) => {
    const id = updateTask.taskId;
    try {
      const response = await instance.delete(`/tasks/${id}`);
      window.location.reload();
      return response.message;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const getTasks = async () => {
    try {
      const response = await instance.get("/tasks");
      console.log({ tasks: response.data });
      const newTasks = transformTasks(response.data || []);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="w-full h-1/2 flex-grow p-2 pb-0">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full h-full grid grid-cols-4 gap-4 shadow-lg rounded-lg">
          {["todo", "inProgress", "underReview", "finished"].map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-4 bg-white rounded h-full no-scrollbar overflow-y-scroll"
                >
                  <h2 className="text-xl text-[#555555] font-[500] mb-2">
                    {headings[columnId]}
                  </h2>
                  <div className="flex flex-col gap-2 ">
                    {tasks[columnId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              taskId={task.id}
                              description={task.description}
                              priority={task.priority}
                              status={task.status}
                              deadline={task.deadline}
                              createdAt={task.createdAt}
                              populateUpdate={populateUpdate}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  {/* add new  */}
                  <div className="w-full p-1 mt-2">
                    <button
                      className="w-full flex justify-between items-center px-2 py-2 text-white bg-bgPrimary rounded-lg text-xl"
                      onClick={() => {
                        populateNewTask(columnId);
                      }}
                    >
                      <span className="text-lg">Add new</span>
                      <IoMdAdd />
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <NewTaskModal
        isOpen={isModalOpen}
        update={update}
        updateTask={updateTask}
        closeModal={closeModal}
        onSave={createTask}
        newTask={newTask}
        updateTaskData={updateTaskData}
        DeleteTaskData={DeleteTaskData}
      />
    </div>
  );
};

export default TaskBoard;
