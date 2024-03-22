export const employees = [
  {
    id: 1,
    name: "Jack",
    lastName: "London",
    username: "Jack_London_1",
    email: "employee1@email.com",
    password: "strongPassword1!",
    orders: [],
    busyHours: [],
    role: ["user"],
  },
  {
    id: 2,
    name: "Flora",
    lastName: "Martinez",
    username: "Flora_Martinez_2",
    email: "employee2@email.com",
    password: "strongPassword1!",
    orders: [],
    busyHours: [],
    role: ["user"],
  },
  {
    id: 3,
    name: "Anne ",
    lastName: "Lara",
    username: "Anne_Lara_3",
    email: "employee3@email.com",
    password: "strongPassword1!",
    orders: [],
    busyHours: [],
    role: ["user"],
  },
];

const createEmployeeForm = ({ name, lastName, email, password }) => ({
  id: employees.length + 1,
  name,
  lastName,
  username: `${name}_${lastName}_${employees.length}`,
  email,
  password,
  orders: [],
  busyHours: [],
  role: ["user"],
});

export const createEmployee = (data) => {
  const employee = createEmployeeForm(data);
  employees.push(employee);
  return employee;
};
