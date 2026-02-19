import type { Request, Response, NextFunction } from "express"
import User from "../models/Users"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prenom, nom } = req.body

        if (!prenom) {
            const error: any = new Error("Le prénom est obligatoire")
            error.status = 400
            throw error
        }

        const newUser = await User.create({ prenom, nom })
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const supprime = await User.destroy({ where: { id: Number(id) } })

        if (!supprime) {
            const error: any = new Error("Utilisateur introuvable")
            error.status = 404
            throw error
        }

        res.json({ message: `Utilisateur ${id} supprimé` })
    } catch (error) {
        next(error)
    }
}
