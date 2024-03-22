import {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { employees, createEmployee } from "../data/employee";
import { admins } from "../data/admin";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = useCallback(
    (data) => {
      try {
        const { email, password } = data;
        const user = employees.find(
          (e) => e.email === email && e.password === password
        );

        if (user) {
          setUser(user);
        } else {
          const admin = admins.find(
            (e) => e.email === email && e.password === password
          );

          if (!admin) {
            throw new Error("Wrong Credentials");
          }

          setUser(admin);
        }

        navigate("/dashboard");
      } catch (err) {
        throw new Error("Something Went Wrong");
      }
    },
    [navigate]
  );

  const signUp = useCallback(
    (data) => {
      try {
        const hasEmail = employees.find((e) => e.email === data.email);
        const hasName = employees.find((e) => e.name === data.name);

        if (hasEmail) {
          throw new Error("The provided mail is already in use.");
        }
        if (hasName) {
          throw new Error("The provided mail is already in use.");
        }

        const employee = createEmployee(data);
        setUser(employee);
        navigate("/dashboard");
      } catch (err) {
        console.log("🚀 ~ signUp ~ err:", err);
        throw new Error("Something went wrong");
      }
    },
    [navigate]
  );

  const signOut = useCallback(() => {
    setUser(null);
    redirect("/sign-in");
  }, []);

  const value = useMemo(
    () => ({ user, signUp, signIn, signOut }),
    [user, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
