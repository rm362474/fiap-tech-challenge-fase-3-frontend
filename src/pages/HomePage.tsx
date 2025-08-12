import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  description: string;
  author: { name: string };
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchPosts = async (q?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts(q);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(search);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Posts</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por termo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
          Buscar
        </button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-white rounded shadow">
              <div>
                <Link
                  to={`/post/${post.id}`}
                  className="text-xl font-bold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <div className="text-gray-700">{post.description}</div>
                <div className="text-sm text-gray-500 mt-2">
                  Autor: {post.author.name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
