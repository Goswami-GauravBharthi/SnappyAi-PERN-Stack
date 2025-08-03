import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const LoginUser = async (decoded) => {
  const { data } = await api.post("/api/user/login", {
    email: decoded.email,
    name: decoded.name,
    avatar: decoded.picture,
  });
  return data;
};

export const getDataUser = async () => {
  const { data } = await api.get("/api/user/get-user-data");
  return data;
};

export const LogoutUser = async () => {
  const { data } = await api.post("api/user/logout");
  return data;
};

export const writeArticale = async ({ prompt, length }) => {
  const { data } = await api.post("/api/ai/generate-article", {
    prompt,
    length,
  });

  return data;
};

export const writeBlogTitle = async ({ prompt }) => {
  const { data } = await api.post("/api/ai/generate-blog-title", { prompt });
  return data;
};
export const GenerateImage = async ({ prompt, publish }) => {
  const { data } = await api.post("/api/ai/generate-image", {
    prompt,
    publish,
  });
  return data;
};

export const removeImageBackground = async (fromData) => {
  const { data } = await api.post("/api/ai/remove-image-background", fromData);
  return data;
};

export const removeObject = async (fromData) => {
  const { data } = await api.post("/api/ai/remove-image-object", fromData);
  return data;
};

export const reviewResume = async (fromData) => {
  const { data } = await api.post("/api/ai/resume-review", fromData);
  return data;
};

export const fetchCreations = async () => {
  const { data } = await api.get("/api/user/get-published-creations");
  console.log("api data : ",data)
  return data;
};

export const likeToggle=async(id)=>{
  const { data } = await api.post("/api/user/toggle-like-creation",{id});
  return data;
}

export const getUserCreations=async()=>{
  const { data } = await api.get("/api/user/get-user-creation");
  return data;
}
export default api;
