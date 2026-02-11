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
