import { employees } from "./employee";
import { hotels } from "./hotel";

export const STATUSES = {
  TODO: "New Order",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export const tasks = [
  {
    id: Math.floor(Math.random() * 1000),
    employee: employees.find((e) => e.id === 1),
    status: STATUSES.TODO,
    address: "123 Main St",
    rooms: [34, 22],
    hotel: hotels.find((h) => h.id === 1),
    startTime: "2024-03-21T09:00:00",
    finishTime: "2024-03-21T12:00:00",
    deadline: "2024-04-01T15:00:00",
  },
  {
    id: Math.floor(Math.random() * 1000),
    employee: employees.find((e) => e.id === 1),
    status: STATUSES.TODO,
    address: "128 Main St",
    rooms: [34, 11],
    hotel: hotels.find((h) => h.id === 1),
    startTime: "2024-03-21T09:00:00",
    finishTime: "2024-03-21T12:00:00",
    deadline: "2024-04-01T15:00:00",
  },
  {
    id: Math.floor(Math.random() * 1000),
    employee: employees.find((e) => e.id === 2),
    status: STATUSES.TODO,
    address: "132 Main St",
    rooms: [38, 2],
    hotel: hotels.find((h) => h.id === 2),
    startTime: "2024-03-21T09:00:00",
    finishTime: "2024-03-21T12:00:00",
    deadline: "2024-04-01T15:00:00",
  },
  {
    id: Math.floor(Math.random() * 1000),
    employee: employees.find((e) => e.id === 2),
    status: STATUSES.IN_PROGRESS,
    address: "456 Elm St",
    hotel: hotels.find((h) => h.id === 3),
    rooms: [19, 21],
    startTime: "2024-03-22T10:30:00",
    finishTime: "2024-03-22T13:30:00",
    deadline: "2024-04-02T16:45:00",
  },
  {
    id: Math.floor(Math.random() * 1000),
    employee: employees.find((e) => e.id === 3),
    status: STATUSES.COMPLETED,
    address: "789 Pine St",
    hotel: hotels.find((h) => h.id === 3),
    rooms: [34, 22],
    startTime: "2024-03-23T08:00:00",
    finishTime: "2024-03-23T11:00:00",
    deadline: "2024-04-03T14:30:00",
  },
];

export const createTaskForm = ({
  employee,
  status,
  address,
  hotel,
  rooms,
  startTime,
  finishTime,
  deadline,
}) => ({
  id: Math.floor(Math.random() * 1000),
  employee,
  status,
  address,
  hotel,
  rooms,
  startTime,
  finishTime,
  deadline,
});
