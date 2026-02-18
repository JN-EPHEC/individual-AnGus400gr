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
    try {
        const { prenom, nom, email } = req.body;

        if (!prenom || !nom || !email) {
            return res.json({ error: "Prénom, nom et email obligatoires" });
        }

        const user = await User.create({ prenom, nom, email });

        res.json(user);

    } catch (error: any) {

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.json({ error: "Email déjà utilisé" });
        }

        if (error.name === "SequelizeValidationError") {
            return res.json({ error: "Email invalide" });
        }

        res.json({ error: "Erreur serveur" });
    }
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