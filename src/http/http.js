import axios from "axios";

axios.defaults.baseURL =
  "https://api.unsplash.com/search/photos/?client_id=rODOiE1Hh-ce3rtBQZmSmye6h_ClaLd_VW9K6UDQcnA";

export const fetchPhoto = async (topic, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=rODOiE1Hh-ce3rtBQZmSmye6h_ClaLd_VW9K6UDQcnA`
  );
  return {
    photo: response.data.results,
    totalPages: response.data.total_pages,
  };
};
