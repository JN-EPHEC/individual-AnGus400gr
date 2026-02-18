import express from "express";
import User from "../models/Users";

const router = express.Router();

router.get("/users", async (req, res) => {
    const sort = req.query.sort;
    let order: any = [];
    if (sort === "asc") {
        order = [["nom", "ASC"]];
    } else if (sort === "desc") {
        order = [["nom", "DESC"]];
    }
    const users = await User.findAll({order});
    res.json(users);
});

router.post("/users", async (req, res) => {
    const {prenom, nom} = req.body;
    if (!prenom) {
        return res.json({error: "Le prénom est obligatoire"});
    }
    const newUser = await User.create({prenom, nom});
    res.json(newUser);
});

router.delete("/users/:id",async (req,res) => {
    const {id} = req.params;
    const supprime = await User.destroy({where:{id:Number(id)}});
    if (!supprime){
        return res.json({error: "Utilisateur introuvable"});
    } else {
        return res.json(`Utilisateur ${id} supprimé`);
    }
});

export default router;