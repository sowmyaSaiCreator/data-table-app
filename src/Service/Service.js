import axios from "axios";

export const getUsersData = async () => {
  let resData = [];
  await axios
    .get("https://randomuser.me/api/?results=20")
    .then((res) => {
      const { results } = res.data;
      resData = results;
    })
    .catch((error) => {
      throw error;
    });
  return resData;
};
