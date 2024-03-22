import { memo, useMemo } from "react";
import MainHeader from "../../components/MainHeader";
import TaskList from "../../components/DragAndDrop";
import { useStore } from "../../state/store/StoreProvider";
import { useAuth } from "../../state/auth/AuthProvider";

const Main = () => {
  const { tasks } = useStore();
  const { user } = useAuth();

  const filteredByUser = useMemo(
    () =>
      user.role.includes("user")
        ? tasks.filter((t) => t.employee.id === user.id)
        : tasks,
    [user, tasks]
  );

  return (
    <div>
      <MainHeader />
      <TaskList tasks={filteredByUser} />
    </div>
  );
};

export default memo(Main);
