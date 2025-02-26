import { setAllJobs } from "@/redux/jobSlice";
import { jobAPI } from "@/utiles/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "react-router-dom";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${jobAPI}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
