const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "5485eee1-20ae-4d5d-ba70-7614431e5a50",
    "Content-Type": "application/json",
  },
};

const handleResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  return handleResponse(res)
};

export const updateUser = async (newUser) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(newUser),
  });
  return handleResponse(res)
};

export const getСards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return handleResponse(res)
};

export const addCard = async (newCard) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  });
  return handleResponse(res)
};

export const deleteCard = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponse(res)
};

export const deleteLike = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponse(res)
};

export const setLike = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
  return handleResponse(res)
};

export const updateAvatar = async (avatarUlr) => {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarUlr),
  });
  return handleResponse(res)
};
