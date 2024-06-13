import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const usePosts = (page: number) => {
  console.log(page);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${BACKEND_URL}/api/v1/post/bulk/10/${page}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          setPosts(response.data);
          setLoading(false);
        });
    };
    getData();
  }, [page]);

  return {
    loading,
    posts,
  };
};

// export const usePostbyId = (id : string) => {
//   const [loading,, setLoading] = useState(true);
//   const [post, setPost] = useState({});

//   useEffect(() => {
//     axios.get(`${}`)
//   },[])

// }
