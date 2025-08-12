const API_URL = import.meta.env.VITE_API_URL;

export async function getPosts(q?: string) {
  const url = q
    ? `${API_URL}/posts?q=${encodeURIComponent(q)}`
    : `${API_URL}/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
}

export async function getPost(id: number) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Post não encontrado");
  return res.json();
}

export async function createPost(
  data: { title: string; description: string; content: string },
  token: string,
) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar post");
  return res.json();
}

export async function updatePost(
  id: number,
  data: { title?: string; description?: string; content?: string },
  token: string,
) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao editar post");
  return res.json();
}

export async function deletePost(id: number, token: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao excluir post");
  return res.json();
}
