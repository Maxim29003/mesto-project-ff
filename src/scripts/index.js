import "../pages/index.css";
import { initialCards } from "../components/cards";
import {
  handleCardDelete,
  createCard,
  handleCardLike,
} from "../components/card";
import {
  addPopupEventListeners,
  openPopup,
  closePopup,
} from "../components/modal";

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];

const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements["link"];

function addCardToList(name, link) {
  placesList.prepend(
    createCard(name, link, handleCardDelete, handleCardLike, handleImagePopup)
  );
}

function handleImagePopup(image, caption) {
  openPopup(imagePopup);
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = caption;
}

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editPopup);
});

addButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addCardToList(placeNameInput.value, linkInput.value);
  newPlaceForm.reset();
  closePopup(newCardPopup);
});

popups.forEach((popup) => {
  addPopupEventListeners(popup);
});

placesList.textContent = "";
initialCards.forEach((item) => {
  addCardToList(item.name, item.link);
});
