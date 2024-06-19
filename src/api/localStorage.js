

export const saveItemToLocalStorage = (user, token)=>{

    const savedUser= JSON.stringify({user,token});
    localStorage.setItem('authData',savedUser);
};

export const getItemFromLocalStorage = () => {
    const retrievedItem = localStorage.getItem('authData');
    return retrievedItem ? JSON.parse(retrievedItem) : null;
  };

  export const removeItemFromLocalStorage = () => {
    localStorage.removeItem('authData');
  };