import { createContext, useEffect, useState, useContext } from "react";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarImg: string;
  dob: string;
  favoriteArticles: string[];
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  avatarImg: string;
  dob: string;
};

type UsersContextT = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  error: string | null;
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  addFavorite: (articleId: string) => void;
  removeFavorite: (articleId: string) => void;
};

type UsersProviderProps = {
  children: React.ReactNode;
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

  const login = async (email: string, password: string) => {
    setError(null);

    try {
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error("Neteisingas el. paštas arba slaptažodis");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Neteisingas el. paštas arba slaptažodis");
      }

      setLoggedInUser(user);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  const register = async ({
    username,
    email,
    password,
    dob,
    avatarImg,
  }: RegisterData) => {
    setError(null);

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      setError("Toks el. paštas jau naudojamas.");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: User = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        dob,
        avatarImg,
        favoriteArticles: [],
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      setLoggedInUser(newUser);

      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Klaida registruojant vartotoją serveryje");
      }
    } catch (err) {
      setError((err as Error).message);
      setUsers((prevUsers) => prevUsers.filter((u) => u.email !== email));
      setLoggedInUser(null);
    }
  };

  const addFavorite = async (articleId: string) => {
    if (!loggedInUser) return;

    const updatedFavorites = Array.isArray(loggedInUser.favoriteArticles)
      ? [...loggedInUser.favoriteArticles, articleId]
      : [articleId];

    const updatedUser = {
      ...loggedInUser,
      favoriteArticles: updatedFavorites,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/users/${loggedInUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            favoriteArticles: updatedUser.favoriteArticles,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Nepavyko pažymėti mėgstamo straipsnio serveryje");
      }

      setLoggedInUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch (err) {
      console.error("Error updating favorites:", err);
      setError((err as Error).message);
    }
  };

  const removeFavorite = async (articleId: string) => {
    if (!loggedInUser || !Array.isArray(loggedInUser.favoriteArticles)) return;

    const updatedFavorites = loggedInUser.favoriteArticles.filter(
      (id) => id !== articleId
    );

    const updatedUser = {
      ...loggedInUser,
      favoriteArticles: updatedFavorites,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/users/${loggedInUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            favoriteArticles: updatedUser.favoriteArticles,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Nepavyko pažymėti mėgstamo straipsnio serveryje");
      }

      setLoggedInUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch (err) {
      console.error("Error updating favorites:", err);
      setError((err as Error).message);
    }
  };

  const value: UsersContextT = {
    users,
    error,
    setUsers,
    loggedInUser,
    setLoggedInUser,
    login,
    logout,
    register,
    addFavorite,
    removeFavorite,
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
