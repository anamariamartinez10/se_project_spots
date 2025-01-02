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
// const page = document.querySelector(".page"); 
// I need to figure out the overlay

function openModal() {
    editProfileModal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

const closeProfileModal = document.querySelector(".modal__button-close");

function closeModal () {
    editProfileModal.classList.remove("modal_opened");
}

closeProfileModal.addEventListener("click", closeModal);
