import { createContext, useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

type Article = {
  id: string;
  authorId: string;
  title: string;
  createdAt: string;
  articleImg: string;
  description: string;
};

type RegisterData = {
  authorId: string;
  title: string;
  articleImg: string;
  description: string;
};

type ArticlesContextT = {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  error: string | null;
  addArticle: (data: RegisterData) => Promise<void>;
};

type ArticlesProviderProps = {
  children: React.ReactNode;
};

const ArticlesContext = createContext<ArticlesContextT | undefined>(undefined);

export const ArticlesProvider = ({ children }: ArticlesProviderProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8080/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchArticles();
  }, []);

  const addArticle = async ({
    authorId,
    title,
    articleImg,
    description,
  }: RegisterData) => {
    setError(null);

    try {
      const newArticle: Article = {
        id: uuidv4(),
        authorId,
        createdAt: new Date().toISOString(),
        title,
        articleImg,
        description,
      };

      setArticles((prevArticles) => [...prevArticles, newArticle]);

      const response = await fetch("http://localhost:8080/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        throw new Error("Klaida talpinant straipsnį serveryje");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const value: ArticlesContextT = {
    articles,
    error,
    setArticles,
    addArticle,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = (): ArticlesContextT => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      "useArticlesContext must be used within a ArticlesProvider"
    );
  }
  return context;
};
