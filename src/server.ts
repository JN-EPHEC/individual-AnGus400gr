import express from 'express';

function greet(name: string): string {
    return `Hey ${name}!`;
}
console.log(greet("Augustin"))

const app = express();
const port = 3000;

app.get('/', (req , res ) => {
    res.send('Bienvenue sur mon serveur API');
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data',(req,res) => {
    res.json(etudiants);
});

app.get('/api/hello/:name',(req,res) => {
    res.json(`{"message": "Bonjour ${req.params.name}", "timestamp": "${new Date().toISOString()}"}`);
})