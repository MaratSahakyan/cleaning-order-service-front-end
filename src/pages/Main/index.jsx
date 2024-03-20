import { memo } from "react";
import MainHeader from "../../components/MainHeader";
import { useAuth } from "../../auth/AuthProvider";

const Main = () => {
  const { user } = useAuth();
  console.log("🚀 ~ Main ~ user:", user);

  return (
    <div>
      <MainHeader />
    </div>
  );
};

export default memo(Main);
