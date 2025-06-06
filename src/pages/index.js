import "./index.css";
import {
  enableValidation,
  resetValidation,
  settings,
  disableButton,
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
const deletePostBtn = deleteForm.querySelector(".modal__button-save_delete");
const cancelButton = deleteForm.querySelector(".modal__button-cancel");

// Card Variables:
const cardTemplate = document.querySelector("#cardTemplate");
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const modalImage = previewModal.querySelector(".modal__image");
const modalCaption = previewModal.querySelector(".modal__caption");
const closePreviewModal = previewModal.querySelector(
  ".modal__button-close-preview"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "01b92f20-dfbf-49e0-a50f-d671985891b4",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(({ isLiked, link, name, _id }) => {
      const cardElement = getCardElement({ isLiked, link, name, _id });
      cardsList.append(cardElement);
    });
    avatarElement.src = userInfo.avatar;
    profileNameElement.textContent = userInfo.name;
    profileJobElement.textContent = userInfo.about;
  })
  .catch(console.error);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Edit Protile Name & Description:

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  resetValidation(editProfileModal, [nameInput, jobInput], settings);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

editFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
});

// Change Avatar Image:

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
  resetValidation(avatarModal, [avatarInput], settings);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      avatarElement.src = data.avatar;
      disableButton(avatarSaveButton, settings);
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
});

// New Post Button:

profilePostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

postFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValues = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const submitBtn = evt.submitter;
  const cardElement = getCardElement(inputValues);
  submitBtn.textContent = "Saving...";

  api
    .addCard(inputValues)
    .then((data) => {
      cardsList.prepend(cardElement);

      const likeButton = cardElement.querySelector(".card__like");
      likeButton.addEventListener("click", (evt) => {
        handleLike(evt, data._id);
      });

      const deleteButton = cardElement.querySelector(".card__delete");
      deleteButton.addEventListener("click", (evt) => {
        handleDeleteCard(cardElement, data._id);
      });

      disableButton(cardSaveButton, settings);
      closeModal(newPostModal);
      postFormElement.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
});

// Delete Modal:

let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  // const deleteBtn = evt.submitter;
  deletePostBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then((data) => {
      selectedCard.remove();
      disableButton(cardSaveButton, settings);
      closeModal(deleteModal);
      deleteForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      deletePostBtn.textContent = "Delete";
    });
}

deletePostBtn.addEventListener("click", handleDeleteSubmit);
cancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

// Like Status:

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like_liked");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like_liked");
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

  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeButton.value = data.isLiked
    ? likeButton.classList.add("card__like_liked")
    : likeButton.classList.remove("card__like_liked");

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

//Close modal on outside click or close buttons:
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
