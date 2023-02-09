let addToy = false;
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

    const cardButton = document.createElement("button");
    cardButton.className = "like-btn";
    cardButton.id = toy.id;
    cardButton.textContent = "Like ❤️";

    //can also append mulitple elements to a parent like this: 
    // card.appendChild(cardH2, cardImage, cardP, cardButton)

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


// alternative renderToy function using innerHTML:

// function renderToy (toy) {
//   const card = createElement('div')
//   card.className ="card"

//   card.innerHTML = `
//   <h2></h2>
//   <imgclass="toy-avatar" />
//   <p>Likes</p>

//   `
// now we can look thru the div we just made to change the innertext! so mwe keep it safe! 

//   div.querySelector('h2').innerText = toyObj.name
// div.querySelector('img').src = toyObj.image
// div.querySelector('p').innerText = 




//   card.appendChild('all the elements?')
//   toyCollection.appendChild(card)

// }

