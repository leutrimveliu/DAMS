import axios from "axios";

const editAsset = async (form, id) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user");
    await axios({
      method: "put",
      url: `http://localhost:4000/editAsset/${id}`,
      data: form,
    })
      .then(function (response) {})
      .catch(function (response) {
        console.log(response);
      });
  };

  const deleteAsset = async (id, user_id) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user");
    await axios({
      method: "delete",
      url: `http://localhost:4000/editAsset/${id}`,
      data: user_id,
    })
      .then(function (response) {})
      .catch(function (response) {
        console.log(response);
      });
  };

  const getManagerAssets = async (id) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user");
    const res = await axios.get(`http://localhost:4000/getAssets/${id}`);
    console.log(res);
    return res.data;
  };
  

  export { editAsset,  deleteAsset, getManagerAssets };