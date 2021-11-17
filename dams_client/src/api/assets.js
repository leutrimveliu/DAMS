import axios from "axios";

const addAsset = async (form) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("user");
  const res = await axios.post(`http://localhost:4000/assets`, form);
  return res.data;
};
const getAssets = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("user");
  const res = await axios.get(`http://localhost:4000/assets`);
  return res.data;
};

const getAsset = async (id) => {
  const res = await axios.get(`http://localhost:4000/assets/${id}`);
  return res.data;
};

export { addAsset, getAssets, getAsset };
