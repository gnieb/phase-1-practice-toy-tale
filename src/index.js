let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((toys) => {
      toys.forEach(renderToy);
    });

  function renderToy(toy) {
    const card = document.createElement("div");
    card.className = "card";

    const cardH2 = document.createElement("h2");
    cardH2.textContent = toy.name;
    card.appendChild(cardH2);

    const cardImage = document.createElement("img");
    cardImage.src = toy.image;
    cardImage.className = "toy-avatar";
    card.appendChild(cardImage);

    const cardP = document.createElement("p");
    cardP.textContent = `${toy.likes} Likes`;
    card.appendChild(cardP);

    const cardButton = document.createElement("btn");
    cardButton.className = "like-btn";
    cardButton.id = toy.id;
    cardButton.textContent = "Like ❤️";

    cardButton.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: (toy.likes += 1),
        }),
      })
        .then((resp) => resp.json())
        .then((toy) => {
          cardP.textContent = `${toy.likes} Likes`;
        });
    });

    card.appendChild(cardButton);

    toyCollection.appendChild(card);
  }

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        renderToy(toy);
      });
    toyForm.reset();
  });
});
