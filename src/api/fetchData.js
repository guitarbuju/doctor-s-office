import axios from "axios";

export const postPersonData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return {
      status: response.status,
      message: response.data.message,
      resultedData: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};

export const fetchAPersonData = async (url, id) => {
  try {
    const response = await axios.get(url, id);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllPeopleData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchData = async (url, data) => {
  const patchURL = `${url}/${data}`;
  console.log(patchURL, data);
  try {
    const response = await axios.put(patchURL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const postPersonDni = async (url, data) => {
  const patchURL = `${url}/${data}`;
  console.log(patchURL, data);
  try {
    const response = await axios.post(patchURL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteById = async (url, data) => {
  const deleteURL = `${url}/${data}`;
  console.log(deleteURL, data);
  try {
    const response = await axios.delete(deleteURL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDniData = async (url, data) => {
  const patchURL = `${url}/${data}`;
  console.log(patchURL, data);
  try {
    const response = await axios.get(patchURL);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getDateData = async (url, status, from, to) => {
  const params = new URLSearchParams({ status, from, to }).toString();
  const requestURL = `${url}?${params}`;

  try {
    const response = await axios.get(requestURL);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const getStatusData = async (url, contact_dni,completed) => {
  const params = new URLSearchParams({ contact_dni, completed}).toString();
  const requestURL = `${url}?${params}`;
  console.log(requestURL);
  try {
    const response = await axios.get(requestURL);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
