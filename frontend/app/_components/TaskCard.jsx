import React from "react";
import Tag from "./Tag";
import { MdModeEdit } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import moment from "moment";

const TaskCard = ({
  taskId,
  title,
  description,
  status,
  priority,
  deadline,
  populateUpdate,
  createdAt,
}) => {
  return (
    <div className="rounded-lg px-3 py-2 border-2 border-gray-200 bg-gray-50 flex flex-col gap-2 items-start relative">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-lg text-gray-600 font-normal">{description}</p>
      <div className="flex">
        <Tag priority={priority} />
      </div>
      {deadline && (
        <div className="flex gap-2 items-center">
          <CiClock2 />
          <p>{deadline.slice(0, 10)}</p>
        </div>
      )}
      <div>
        <p>{moment(new Date(createdAt)).fromNow()}</p>
      </div>
      <div
        className="absolute right-4 top-2 cursor-pointer"
        onClick={() => {
          populateUpdate({
            taskId,
            title,
            description,
            priority,
            deadline: deadline ? deadline.slice(0, 10) : "",
            status,
          });
        }}
      >
        <MdModeEdit />
      </div>
    </div>
  );
};

export default TaskCard;
