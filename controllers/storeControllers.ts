import {readAllStores} from '../models/store'

export function getStore(req,res){
    const allStores:any = readAllStores()
    const findStore = allStores.find(store=>store.store === req.params.store)
    res.send({findStore})
}