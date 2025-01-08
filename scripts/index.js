const initialCards = [{name: "Running photo by Martins Zemlickis", link: "https://unsplash.com/photos/people-running-on-road-during-daytime-NPFu4GfFZ7E"},
                      {name: "Bread photo by Wesual Click", link: "https://unsplash.com/photos/cereal-and-three-buns-rsWZ-P9FbQ4"}, 
                      {name: "Running photo by Jeremy Lapak", link: "https://unsplash.com/photos/person-running-on-top-on-hill-during-daytime-CVvFVQ_-oUg"}, 
                      {name: "Bread photo by Rodolfo Marques", link: "https://unsplash.com/photos/sliced-breads-GzBO_o0RvEg"}, 
                      {name: "Running photo by Nicolas Hoizey", link: "https://unsplash.com/photos/people-running-on-race-track-poa-Ycw1W8U"}, 
                      {name: "Bread photo by Arturrro", link: "https://unsplash.com/photos/cooking-pot-with-powder-h2CPeqTzaaY"}
                     ]

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#modal__input-name");
const jobInput = editProfileModal.querySelector("#modal__input-description");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__subtitle");
const closeProfileModal = document.querySelector(".modal__button-close");

profileEditButton.addEventListener("click", openModal);
closeProfileModal.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

function openModal() {
    editProfileModal.classList.add("modal_opened");
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
}

function closeModal () {
    editProfileModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal();
}


// Render Cards:
const cardTemplate = document.querySelector("#cardTemplate");
const cardsList = document.querySelector(".cards__list");

function getCardElement (data) {
  const cardElement = cardTemplate.querySelector(".card").content.cloneNode(true);
  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const cardAltText = cardImage.alt;
  cardText.textContent = data.value;
  cardImage.src = data.src;
}

for(let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}


// const submit = document.querySelector(".modal__button-save");
// profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Render Cards:
// set the image’s src attribute to the image to the link field of the object
// set the image’s alt text to the name field of the object
// set the card’s title to the name field of the object, too
// return the ready HTML element with the filled-in data
// Iterate over the cards array using a loop, and in each iteration:

// Pass the array item to your getCardElement() function to create a card element.
// Use the appropriate built-in DOM method to add this HTML element to the page.


// initialCards.forEach() {
//   
//   cardText.textContent = initialCards[i].name;
//   cardImage.src = initialCards[i].link;
// }





// -------
// const dataArray = [
//   { title: 'Card 1', imageUrl: 'path/to/image1.jpg' },
//   { title: 'Card 2', imageUrl: 'path/to/image2.jpg' },
//   // more items...
// ];

// dataArray.forEach(item => {
//   const template = document.querySelector('#card-template').content.cloneNode(true);
//   template.querySelector('.card__title').textContent = item.title;
//   template.querySelector('.card__image').src = item.imageUrl; // Assuming you have an <img> with class 'card__image'

//   document.querySelector('.cards').appendChild(template);
// });