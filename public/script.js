const userList = document.getElementById("user-list");
const userForm = document.getElementById("user-form");
const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const sortSelect = document.getElementById("sort-select");
const emailInput = document.getElementById("email");

async function loadUsers(sort = "asc") {
    try {
        const res = await fetch(`/api/users?sort=${sort}`);
        const users = await res.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            const text = document.createElement("span");
            text.textContent = `${user.nom} ${user.prenom || ""} - ${user.email}`;
            li.appendChild(text);

            const supp = document.createElement("button");
            supp.textContent = "X";
            supp.className = "btn btn-danger btn-sm";

            supp.addEventListener("click", async () => {
                const res = await fetch(`/api/users/${user.id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    loadUsers(sortSelect.value);
                }
            });
            li.appendChild(supp);
            userList.appendChild(li);
        });
    } catch (err) {
        console.error("Erreur :", err);
    }
}

sortSelect.addEventListener("change", () => {
    loadUsers(sortSelect.value);
});

window.addEventListener("DOMContentLoaded", () => {
    loadUsers(sortSelect.value);
});

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prenom = prenomInput.value.trim();
    const nom = nomInput.value.trim();
    const email = emailInput.value.trim();

    if (!prenom || !nom || !email) {
        alert("Prénom, nom et email obligatoires");
        return;
    }


    try {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prenom, nom, email })
        });

        if (res.ok) {
            loadUsers();
            prenomInput.value = "";
            nomInput.value = "";
            emailInput.value = "";
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
    }
});