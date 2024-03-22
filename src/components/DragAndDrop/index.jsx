import React, { useState, useEffect, useCallback, memo } from "react";
import { format } from "date-fns";
import { useStore } from "../../state/store/StoreProvider";
import CreateEditTaskModal from "../CreateEditTaskModal";
import { useAuth } from "../../state/auth/AuthProvider";
import "./styles.css";

const TaskList = ({ tasks }) => {
  const { handleChangeTaskToEdit } = useStore();
  const [taskList, setTaskList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updatedTasks = taskList.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setTaskList(updatedTasks);
  };

  const handleClick = useCallback(
    (id) => () => handleChangeTaskToEdit(id),
    [handleChangeTaskToEdit]
  );

  const renderTasks = useCallback(
    (tasks, status) => {
      return tasks.map((task) => (
        <div
          className="card"
          key={task.id}
          id={task.id}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {user.role.includes("admin") ? (
            <CreateEditTaskModal
              title="Edit Task"
              handleClick={handleClick(task.id)}
            />
          ) : (
            <></>
          )}
          <div className="smallContainer">
            <div className="card_right">
              <div className="card-item">Address: {task.address}</div>
              <div className="card-item">Name: {task.hotel.name}</div>
              <div className="card-item">Apartment: {task.apartment}</div>
              <div className="card-item">
                Assigned: {task.employee.username}
              </div>
            </div>
            <div className="card_right">
              <div className="card-item">
                Start Time: {format(task.startTime, "MMMM dd HH:mm")}
              </div>
              <div className="card-item">
                Finish Time:
                {format(task.finishTime, "MMMM dd HH:mm")}
              </div>
              <div className="card-item">
                Deadline: {format(task.deadline, "MMMM dd HH:mm")}
              </div>
              <div className="card-item">Status: {task.status}</div>
            </div>
          </div>
        </div>
      ));
    },
    [handleClick, user.role]
  );

  return (
    <div className="container">
      <div
        className="order small-box"
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, false, "New Order")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Todo List</h4>
                {renderTasks(
                  taskList.filter((data) => data.status === "New Order")
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="pending small-box"
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, false, "In Progress")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>In Progress</h4>
                {renderTasks(
                  taskList.filter((data) => data.status === "In Progress")
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="done small-box"
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, true, "Completed")}
      >
        <section className="drag_container">
          <div className="container">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Completed</h4>
                {renderTasks(
                  taskList.filter((data) => data.status === "Completed")
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(TaskList);
