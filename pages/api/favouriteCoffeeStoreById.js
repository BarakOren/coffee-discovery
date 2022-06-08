import {table, getMinifiedRecords, findRecordByFilter} from "../../lib/airtable"

const favouriteCoffeeStoreById = async (req, res) => {
    if(req.method === "PUT"){

        try{
        const {id} = req.body;
        if(id){
            const records = await findRecordByFilter(id)
            if(records.length !== 0){
                //getting current vote num
                const record = records[0]
                const calculateVoting = parseInt(record.voting) + 1
                //update vote unm
                const updateRecord = await table.update([
                    {
                        id: record.recordId,
                        fields: {
                            voting: calculateVoting
                        }
                    }
                ])
                if(updateRecord){
                    const minifiedRecords = getMinifiedRecords(updateRecord)
                    res.json(minifiedRecords)
                }

            } else { 
                res.json({message: 'coffee store id doesnt exist.', id})
            }
        } else {
            res.status(400)
            res.json({message: ' id is missing.', id})
        }
    } catch (error) {
            res.status(500)
            res.json({message: "error upvoting.", error})
        }
    }

}

export default favouriteCoffeeStoreById;