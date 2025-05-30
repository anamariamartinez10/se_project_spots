import "./index.css";
import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// Pass settings objects to the validation functions that are called here

// const initialCards = [
//   {
//     name: "Daytime road running by Martins Zemlickis",
//     link: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D",
//   },
//   {
//     name: "Cereal and three buns by Wesual Click",
//     link: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
//   },
//   {
//     name: "Daytime hill run by Jeremy Lapak",
//     link: "https://images.unsplash.com/photo-1518214598173-1666bc921d66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cnVubmluZ3xlbnwwfHwwfHx8Mg%3D%3D",
//   },
//   {
//     name: "Sliced breads by Rodolfo Marques",
//     link: "https://images.unsplash.com/photo-1533782654613-826a072dd6f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
//   },
//   {
//     name: "Track race by Nicolas Hoizey",
//     link: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Cooking pot with powder by Arturrro",
//     link: "https://images.unsplash.com/photo-1521471109507-43d61bb345dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8fDI%3D",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "01b92f20-dfbf-49e0-a50f-d671985891b4",
    "Content-Type": "application/json",
  },
});

//destructure second item in callback of the .then()
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
  })
  //handle the users information
  // set src of avatar image
  //set text content of both the texts elements
  .catch(console.error);

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

// Avatar Variables:
const avatarEditButton = document.querySelector(".profile__image-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarElement = document.querySelector(".profile__image");
const avatarSaveButton = avatarModal.querySelector(".modal__button-save");

// New Post Variables:
const profilePostButton = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const linkInput = newPostModal.querySelector("#modal__input-link");
const captionInput = newPostModal.querySelector("#modal__input-caption");
const postFormElement = newPostModal.querySelector(".modal__form");
const cardImage = document.querySelector(".card__image");
const cardText = document.querySelector(".card__text");
const closePostModal = newPostModal.querySelector(".modal__button-close");
const cardSaveButton = newPostModal.querySelector(".modal__button-save");

// Delete Modal Variables:
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Edit Protile Button:

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  resetValidation(editProfileModal, [nameInput, jobInput], settings);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

editFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // Change text content to "Saving..."
  const submitBtn = evt.sumbitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      // TODO: use data instead of input values
      profileNameElement.textContent = nameInput.value;
      profileJobElement.textContent = jobInput.value;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      //change text content back to "Save"
      submitBtn.textContent = "Save";
    });
});

// Change Avatar:

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
  resetValidation(avatarModal, [avatarInput], settings);
  // avatarInput.value = avatarElement.link;
});

//update image on refresh

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // const inputValues = { link: avatarInput.value };
  console.log(avatarInput.value);
  // const avatarElement = getCardElement(inputValues);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      //update image on submit
    })
    .catch(console.error);

  // disableButton(avatarSaveButton, settings);
  closeModal(avatarModal);
  avatarForm.reset();
});

// New Post Button:

profilePostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

postFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValues = { name: captionInput.value, link: linkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  disableButton(cardSaveButton, settings);
  closeModal(newPostModal);
  postFormElement.reset();
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

// Delete Modal:

let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(selectedCardId);
  // .then((data) => {
  //   console.log(data);
  // })
  // .catch(console.error);

  //remove card from DOM
  // close modal
  disableButton(cardSaveButton, settings);
  closeModal(deleteModal);
  deleteForm.reset();
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Like Status:
function handleLike(evt, id) {
  // likeButton.classList.toggle("card__like_liked");
  const isLiked = true;
  api
    .changeLikeStatus(id, isLiked)
    .then((evt) => {
      evt.target.classList.toggle("card__like_liked");
      //toggle not working?
    })
    .catch(console.error);
}

// Get Card Element

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete");
  const likeButton = cardElement.querySelector(".card__like");

  // if card is liked, set active class on card

  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;
  });

  return cardElement;
}

// Close modal on Esc press:
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

//Close modal when clicking outside modal or modal close buttons:
const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__button-close")
    ) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
