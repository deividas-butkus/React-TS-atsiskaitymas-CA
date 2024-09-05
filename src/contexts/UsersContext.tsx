import { createContext, useEffect, useState, useContext } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarImg: string;
  dob: string;
  favoritePosts: [];
};

type UsersProviderProps = {
  children: React.ReactNode;
};

type UsersContextT = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  error: string | null;
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UsersContext = createContext<UsersContextT | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchUsers();
  }, []);

  const value: UsersContextT = {
    users,
    error,
    setUsers,
    loggedInUser,
    setLoggedInUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsersContext = (): UsersContextT => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};
