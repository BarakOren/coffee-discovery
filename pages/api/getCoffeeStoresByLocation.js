import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    try{
        const {latLong} = req.query;
        const response = await fetchCoffeeStores(latLong);
        console.log(response)
        res.status(200)
        res.json(response)
    } catch(error){
        res.status(500)
        res.json({message: "Something went wrong"})
        console.error("error...")
    }

}

export default getCoffeeStoresByLocation