const initialCards = [{name: "Daytime road running by Martins Zemlickis", link: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D"},
                      {name: "Cereal and three buns by Wesual Click", link: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJlYWR8ZW58MHx8MHx8fDI%3D"}, 
                      {name: "Daytime hill run by Jeremy Lapak", link: "https://images.unsplash.com/photo-1518214598173-1666bc921d66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D"}, 
                      {name: "Sliced breads by Rodolfo Marques", link: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDI%3D"}, 
                      {name: "Track race by Nicolas Hoizey", link: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}, 
                      {name: "Cooking pot with powder by Arturrro", link: "https://images.unsplash.com/photo-1521471109507-43d61bb345dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8fDI%3D"}
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
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}

for(let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}


