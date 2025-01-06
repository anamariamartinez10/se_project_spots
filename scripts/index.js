const initialCards = [{name: "Running photo by Martins Zemlickis", link: "https://unsplash.com/photos/people-running-on-road-during-daytime-NPFu4GfFZ7E"},
                      {name: "Bread photo by Wesual Click", link: "https://unsplash.com/photos/cereal-and-three-buns-rsWZ-P9FbQ4"}, 
                      {name: "Running photo by Jeremy Lapak", link: "https://unsplash.com/photos/person-running-on-top-on-hill-during-daytime-CVvFVQ_-oUg"}, 
                      {name: "Bread photo by Rodolfo Marques", link: "https://unsplash.com/photos/sliced-breads-GzBO_o0RvEg"}, 
                      {name: "Running photo by Nicolas Hoizey", link: "https://unsplash.com/photos/people-running-on-race-track-poa-Ycw1W8U"}, 
                      {name: "Bread photo by Arturrro", link: "https://unsplash.com/photos/cooking-pot-with-powder-h2CPeqTzaaY"}
                     ]


//  Open Edit Modal on Click:

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");

function openModal() {
    editProfileModal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

const closeProfileModal = document.querySelector(".modal__button-close");

function closeModal () {
    editProfileModal.classList.remove("modal_opened");
}

closeProfileModal.addEventListener("click", closeModal);



// Form Submission:

// TODO: Find the form in the DOM.
const profileFormElement = document.querySelector(".modal__form");

// TODO: Find the form fields in the DOM.
const nameInput = document.querySelector(".modal__input-name");
const jobInput = document.querySelector(".modal__input-description");

// TODO: Find the profile elements in the DOM
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__subtitle");

// The form submission handler. Note that its name 
// starts with a verb and concisely describes what it does.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below. 
  evt.preventDefault(); 
 
  // TODO: Get the values of each form field from the value property 
  // of the corresponding input element.
  // TODO: Then insert these new values into the textContent property of the 
  // corresponding profile elements.
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  
  // TODO: Close the modal.
  closeModal();
}

// Connect the handler to the form, so it will watch for the submit event.
formElement.addEventListener('submit', handleProfileFormSubmit);


// Render Cards
// 1. Change HTML with <template>
// 2. Write JS to change template