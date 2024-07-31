import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosResize } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";

const NewTaskModal = ({
  isOpen,
  closeModal,
  onSave,
  update,
  updateTask,
  newTask,
  updateTaskData,
  DeleteTaskData,
}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    if (update) {
      updateTaskData({
        title,
        status,
        priority,
        deadline: new Date(deadline),
        description,
      });
    } else {
      onSave({
        title,
        status,
        priority,
        deadline: new Date(deadline),
        description,
      });
    }

    setTitle("");
    setStatus("");
    setPriority("");
    setDeadline("");
    setDescription("");
    closeModal();
  };

  useEffect(() => {
    console.log(
      update
        ? "model will be used for update"
        : "model will be used to create task"
    );
    if (update) {
      console.log("status", updateTask.status);
      setTitle(updateTask.title);
      setStatus(updateTask.status);
      setPriority(updateTask.priority);
      setDeadline(updateTask.deadline);
      setDescription(updateTask.description);
    }

    if (newTask.create) {
      setStatus(newTask.status);
    }
  }, [update, newTask]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-slate-400 bg-opacity-20 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="w-1/2 h-[80%] bg-white rounded-lg">
        {/* modal actions  */}
        <div className="flex justify-between p-4 cursor-pointer">
          <div className="text-xl flex gap-4 items-center justify-center text-gray-500">
            <MdOutlineCancel
              onClick={() => {
                // resetUpdate();
                closeModal();
                setTitle("");
                setStatus("");
                setPriority("");
                setDeadline("");
                setDescription("");
              }}
            />
            <IoIosResize />
          </div>
          <div className="text-lg flex gap-4 items-center justify-center">
            <button className="flex gap-2 p-2 bg-slate-200 text-xl items-center rounded-lg">
              <p>Share</p>
              <CiShare2 />
            </button>
            <button className="flex gap-2 p-2 bg-slate-200 text-xl items-center rounded-lg">
              <p>Favorite</p>
              <CiStar />
            </button>
          </div>
        </div>
        {/* new task form  */}
        <div className="w-full px-8 flex flex-col gap-2">
          {/* title  */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full text-4xl outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* status  */}
          <div className="flex mb-4">
            <div className="flex gap-6 w-1/2">
              <img src="/icons/status.png" alt="status" />
              <label htmlFor="status" className="text-xl text-gray-500">
                Status
              </label>
            </div>
            <div className="w-1/2 flex">
              <select
                name="status"
                id="status"
                className="text-xl text-black outline-none appearance-none px-4"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Not Selected</option>
                <option value="todo">To do</option>
                <option value="inProgress">In progress</option>
                <option value="underReview">Under review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
          </div>
          {/* priority */}
          <div className="flex mb-4">
            <div className="flex gap-6 w-1/2">
              <img src="/icons/priority.png" alt="priority" />
              <label htmlFor="priority" className="text-xl text-gray-500">
                Priority
              </label>
            </div>
            <div className="w-1/2">
              <select
                name="priority"
                id="priority"
                className="text-xl outline-none appearance-none px-4"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Not Selected</option>
                <option value="urgent" className="text-black">
                  Urgent
                </option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          {/* deadline */}
          <div className="flex mb-4">
            <div className="flex gap-6 w-1/2">
              <img src="/icons/deadline.png" alt="deadline" />
              <label htmlFor="deadline" className="text-xl text-gray-500">
                Deadline
              </label>
            </div>
            <div className="w-1/2">
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="text-xl text-gray-500 outline-none px-4 appearance-none"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          {/* description */}
          <div className="mb-4">
            <textarea
              className="w-full text-xl outline-none px-4 py-2 border rounded-lg resize-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>
          {/* submit button */}
          <div className="flex justify-end gap-4">
            {update && (
              <button
                onClick={() => DeleteTaskData()}
                className="p-2 bg-urgent text-white rounded-lg text-xl"
              >
                {update && "Delete"}
              </button>
            )}
            <button
              onClick={() => handleSubmit()}
              className="p-2 bg-blue-500 text-white rounded-lg text-xl"
            >
              {!update ? "Save" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
