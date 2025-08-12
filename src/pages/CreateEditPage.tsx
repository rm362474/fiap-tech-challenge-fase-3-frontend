import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createPost, updatePost, getPost } from "../services/posts";
import { useAuth } from "../hooks/useAuth";

const schema = z.object({
  title: z
    .string()
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(2, "Descrição deve ter pelo menos 2 caracteres")
    .max(300, "Descrição deve ter no máximo 300 caracteres"),
  content: z.string().min(2, "Conteúdo deve ter pelo menos 2 caracteres"),
});

const CreateEditPage = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const [form, setForm] = useState({ title: "", description: "", content: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (isEdit && id) {
      setFetching(true);
      getPost(Number(id))
        .then((post) => {
          setForm({
            title: post.title,
            description: post.description,
            content: post.content,
          });
        })
        .finally(() => setFetching(false));
    } else {
      setForm({ title: "", description: "", content: "" });
    }
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      if (isEdit && id) {
        await updatePost(Number(id), form, token!);
      } else {
        await createPost(form, token!);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao salvar post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-2">
        {isEdit ? "Editar Post" : "Criar Post"}
      </h1>
      {fetching ? (
        <div className="text-blue-600 mb-4">Carregando dados do post...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            maxLength={100}
            disabled={loading}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            maxLength={300}
            disabled={loading}
          />
          <textarea
            name="content"
            placeholder="Conteúdo"
            value={form.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded h-32"
            disabled={loading}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className={`w-full py-2 rounded hover:cursor-pointer ${isEdit ? "bg-yellow-500" : "bg-blue-600"} text-white`}
            disabled={loading}
          >
            {loading
              ? isEdit
                ? "Salvando alterações..."
                : "Criando..."
              : isEdit
                ? "Salvar alterações"
                : "Criar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateEditPage;
