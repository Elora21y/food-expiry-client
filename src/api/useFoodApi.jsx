
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useFoodApi = () => {
  const axiosSecure = useAxiosSecure();
  const AddPromiseFood = (email) => {
    return axiosSecure
      .get(`/foods/my-list?email=${email}`)
      .then((res) => res.data);
  };
  return {
    AddPromiseFood,
  };
};

export default useFoodApi;
