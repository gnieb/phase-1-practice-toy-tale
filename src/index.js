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

const toyCollection = document.querySelector('#toy-collection')
 console.log(toyCollection)

fetch("http://localhost:3000/toys")
  .then( resp => resp.json())
  .then( toys => { 
    toys.forEach(renderToy)
  })


  function renderToy (toy) {
    const card = document.createElement('div')
    card.className = 'card';

    const cardH2 = document.createElement('h2')
    cardH2.textContent = toy.name
    card.appendChild(cardH2)

    const cardImage = document.createElement('img')
    cardImage.src = toy.image
    cardImage.className = "toy-avatar"
    card.appendChild(cardImage)

    const cardP = document.createElement('p')
    cardP.textContent = `${toy.likes} Likes`
    card.appendChild(cardImage)

    const cardButton = document.createElement('btn')
    cardButton.className = "like-btn"
    cardButton.id = toy.id
    cardButton.textContent = "Like ❤️"
    card.appendChild(cardButton)

    toyCollection.appendChild(card)
  }


});
