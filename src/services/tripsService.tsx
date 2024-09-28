import axios from "axios";
const path = `http://localhost:9000/api/trips`;
const getDataListTrips = async (body: any) => {
    console.log('body ::>>>LL', body)
    try {
        if(body){
            const response = await axios.get(
                `${path}?keyword=${body}`,
            );
            return response.data;
        } else{
            const response = await axios.get(
                `${path}`,
            );
            return response.data;
        }
        
    } catch (error) {
        console.log("error ", error);
        throw error;
    }
};
export {
    getDataListTrips
  };