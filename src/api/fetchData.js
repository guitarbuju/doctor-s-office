import axios from 'axios';

export const postPersonData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const fetchAPersonData = async ( url, id) => {
    try {
      
      const response = await axios.get( url,id);
      return response.data; 
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  export const fetchAllPeopleData = async ( url) => {
    try {
      
      const response = await axios.get( url);
      return response.data; 
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };
  
export const patchData = async(url,data)=>{
  const patchURL=`${url}/${data}`;
  console.log(patchURL,data)
  try{
    const response = await axios.put(patchURL);
    return response.data;

  }catch(error){
console.error(error);
  }

}  

