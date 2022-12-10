const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  
    //query want u to throw error
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchPet;