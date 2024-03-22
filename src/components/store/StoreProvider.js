import {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createTaskForm, tasks as mainTasks } from "../../data/task";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [tasks, setTasks] = useState([...mainTasks]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const createTask = useCallback(
    (data) => {
      const newTask = createTaskForm(data);
      setTasks([...tasks, newTask]);
    },
    [tasks]
  );

  const editTask = useCallback(
    (taskToEdit) => {
      const newTasks = tasks.map((t) =>
        t.id === taskToEdit.id ? taskToEdit : t
      );
      setTasks(newTasks);
      setTaskToEdit(null);
    },
    [tasks]
  );

  const handleChangeTaskToEdit = useCallback(
    (taskToEditId) => {
      const currentTaskToEdit = tasks.find((t) => t.id === taskToEditId);
      if (currentTaskToEdit) {
        setTaskToEdit(currentTaskToEdit);
      }
    },
    [tasks]
  );

  const handleCleanTaskToEdit = useCallback(() => {
    setTaskToEdit(null);
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      taskToEdit,
      handleCleanTaskToEdit,
      createTask,
      editTask,
      handleChangeTaskToEdit,
    }),
    [
      tasks,
      taskToEdit,
      createTask,
      editTask,
      handleChangeTaskToEdit,
      handleCleanTaskToEdit,
    ]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;

export const useStore = () => {
  return useContext(StoreContext);
};
