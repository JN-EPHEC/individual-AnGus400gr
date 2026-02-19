import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import "./models/Users";
import {requestLogger} from './middlewares/logger';
import {errorHandler} from './middlewares/errorHandler';
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger"


function greet(name: string): string {
    return `Hey ${name}!`;
}
console.log(greet("Augustin"))

const app = express();
const port = 3000;

const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(requestLogger);

app.get('/api/data',(req,res) => {
    res.json(etudiants);
});

app.get('/api/hello/:name',(req,res) => {
    res.json({"message": `Bonjour ${req.params.name}`, "timestamp": new Date().toISOString()});
})

app.use(express.static('public'));

app.use("/api", userRoutes);

app.use(errorHandler)

sequelize.authenticate().then(()=>{
    console.log('Connexion à la base de donnée SQLite établie.');
    return sequelize.sync();
}).then(()=> {
    console.log('Base de donnée synchronisée');
    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
}).catch((err) => {
    console.error(err);
});