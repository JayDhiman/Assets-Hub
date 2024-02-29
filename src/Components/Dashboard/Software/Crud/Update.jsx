import axios from 'axios'
import React from 'react'
import axios from 'axios'

const Update = () => {
     // fetch the Data
    const fetchAssetData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/Software");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    // update the data
       
       const updateForm = async ()=>{
       const res = await axios.put("http://localhost:4000/Software")

     }




    useEffect(() => {
       
        
        fetchAssetData();
      }, []);
    return (
   <>

   </>
  )
}

export default Update