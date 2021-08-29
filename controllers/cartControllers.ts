import { seeAllCartsStore } from '../models/carts'

export function historialCart(req, res) {
    const getAllCartsHistorial = seeAllCartsStore(req.params.store)
    res.send({ allCarts: getAllCartsHistorial })
}