import {table, getMinifiedRecords, findRecordByFilter} from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST"){

        const {id, name, address, voting, imgUrl} = req.body;

        try {
            if(id){
                const records = await findRecordByFilter(id)
                if(records.length !== 0){
                    //returning existing record
                    res.json(records)
                    } else {
                        //creating new record
                        if(name) {
                            const createRecords = await table.create([
                                {
                                    fields: {
                                        id,
                                        name,
                                        address,
                                        voting,
                                        imgUrl
                                    }
                                }
                            ])
                            const records = getMinifiedRecords(createRecords)
                            res.json({ message: "created a record", records: records})
                        } else {
                            res.status(400)
                            res.json({ message: "name is missing" }) 
                        }
                    }
            } else {
                res.status(400)
                res.json({ message: "no id" }) 
            }
        } catch (err) {
            res.status(500)
            res.json({message: "Error creating or finding a store", err})
            console.error({message: "Error creating or finding a store", err})
        }

        
       

    }
}

export default createCoffeeStore