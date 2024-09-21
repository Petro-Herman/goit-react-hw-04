import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos/";

export const fetchPhoto = async (topic, page) => {
  const response = await axios.get("", {
    params: {
      client_id: "rODOiE1Hh-ce3rtBQZmSmye6h_ClaLd_VW9K6UDQcnA",
      query: topic,
      page: page,
    },
  });
  return {
    photo: response.data.results,
    totalPages: response.data.total_pages,
  };
};
