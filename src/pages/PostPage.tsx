import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/posts";

interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  author: { name: string };
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const data = await getPost(Number(id));
          setPost(data);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !post ? (
        <div>Post não encontrado.</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-700 mb-4">{post.description}</div>
          <div className="mb-6 whitespace-pre-line">{post.content}</div>
          <div className="text-sm text-gray-500">Autor: {post.author.name}</div>
        </>
      )}
    </div>
  );
};

export default PostPage;
