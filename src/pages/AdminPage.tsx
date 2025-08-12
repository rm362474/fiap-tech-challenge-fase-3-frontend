import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../services/posts";
import { useAuth } from "../hooks/useAuth";

interface Post {
  id: number;
  title: string;
  description: string;
  author: { name: string };
}

const AdminPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;
    setDeleting(id);
    try {
      await deletePost(id, token!);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.message || "Erro ao excluir post");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Administração de Posts</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-white rounded shadow flex flex-col gap-2"
            >
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {post.title}
                </div>
                <div className="text-gray-700">{post.description}</div>
                <div className="text-sm text-gray-500 mt-2">
                  Autor: {post.author.name}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                  disabled={deleting === post.id}
                >
                  {deleting === post.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
