"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { instance } from "../axiosConfig";

interface ITask {
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string;
}

const NewTaskModal = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const createTask = async (taskObject: ITask) => {
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
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createTask({ title, status, priority, deadline, description });
    setTitle("");
    setStatus("");
    setPriority("");
    setDeadline("");
    setDescription("");

    router.push("/");
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`w-full h-screen bg-slate-200 bg-opacity-20 flex items-center justify-center`}
    >
      <div className="w-1/2 h-[80%] bg-white rounded-lg">
        {/* modal actions  */}
        <div className="flex justify-between p-4 cursor-pointer">
          <div
            className="text-xl flex gap-2 items-center justify-center text-gray-500 bg-slate-200 p-2 rounded-lg"
            onClick={() => {
              router.push("/");
            }}
          >
            <FaArrowLeft />
            <p>Go back</p>
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
        <form
          className="w-full px-8 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
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
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg text-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
