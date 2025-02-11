const initialCards = [
  {
    name: "Daytime road running by Martins Zemlickis",
    link: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Cereal and three buns by Wesual Click",
    link: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
  },
  {
    name: "Daytime hill run by Jeremy Lapak",
    link: "https://images.unsplash.com/photo-1518214598173-1666bc921d66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Sliced breads by Rodolfo Marques",
    link: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
  },
  {
    name: "Track race by Nicolas Hoizey",
    link: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cooking pot with powder by Arturrro",
    link: "https://images.unsplash.com/photo-1521471109507-43d61bb345dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
  },
];

// Edit Profile Variables:
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const nameInput = editProfileModal.querySelector("#modal__input-name");
const jobInput = editProfileModal.querySelector("#modal__input-description");
const editFormElement = editProfileModal.querySelector(".modal__form");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__subtitle");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__button-close"
);

// New Post Variables:
const profilePostButton = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const linkInput = newPostModal.querySelector("#modal__input-link");
const captionInput = newPostModal.querySelector("#modal__input-caption");
const postFormElement = newPostModal.querySelector(".modal__form");
const cardImage = document.querySelector(".card__image");
const cardText = document.querySelector(".card__text");
const closePostModal = newPostModal.querySelector(".modal__button-close");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Edit Protile Button:

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

// closeProfileModal.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

editFormElement.addEventListener("submit", (evt) => {
  editProfileModal.classList.remove("modal_opened");
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editFormElement);
});

// New Post Button:

profilePostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

// closePostModal.addEventListener("click", () => {
//   closeModal(newPostModal);
// });

postFormElement.addEventListener("submit", (evt) => {
  newPostModal.classList.remove("modal_opened");
  evt.preventDefault();
  const inputValues = { name: captionInput.value, link: linkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(postFormElement);
});

// Render Cards:
const cardTemplate = document.querySelector("#cardTemplate");
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");
const closePreviewModal = previewModal.querySelector(
  ".modal__button-close-preview"
);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const likeButton = cardElement.querySelector(".card__like");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_liked");
  });

  const deleteButton = cardElement.querySelector(".card__delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;
  });

  return cardElement;
}

// closePreviewModal.addEventListener("click", () => {
//   closeModal(previewModal);
// });

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});

// closePreviewModal.addEventListener("click", () => {
//   closeModal(previewModal);
// });

// closePostModal.addEventListener("click", () => {
//   closeModal(newPostModal);
// });

// closeProfileModal.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

const closeButtons = document.querySelectorAll(".modal__button-close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
