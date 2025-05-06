import "../pages/index.css";
import { createCard } from "../components/card";
import {
  addPopupEventListeners,
  openPopup,
  closePopup,
} from "../components/modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUser,
  getСards,
  updateUser,
  addCard,
  deleteCard,
  updateAvatar,
} from "./api";

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");
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

const deleteCardForm = document.forms["delete-card"];
const avatarImageForm = document.forms["avatar-image"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

placesList.textContent = "";

function addCardToList(card, isDeletable = true, isLiked = false) {
  placesList.prepend(
    createCard(card, isDeletable, isLiked, handleCardDelete, handleImagePopup)
  );
}

function handleImagePopup(image, caption) {
  openPopup(imagePopup);
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = caption;
}

function updateProfile(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

function handleCardDelete(card, cardId) {
  openPopup(deleteCardPopup);
  deleteCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const button = event.submitter;
    const initialButtonText = button.textContent;
    button.textContent = "Удаление...";
    button.disabled = true;

    deleteCard(cardId)
      .then(() => {
        card.remove();
        closePopup(deleteCardPopup);
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      })
      .finally(() => {
        button.textContent = initialButtonText;
        button.disabled = false;
      });
  });
}

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editPopup);
});

editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  const button = event.submitter;
  const initialButtonText = button.textContent;
  button.textContent = "Сохранение...";
  button.disabled = true;

  updateUser({
    name: nameInput.value,
    about: profileDescription.textContent,
  })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      button.textContent = initialButtonText;
      button.disabled = false;
    });

  closePopup(editPopup);
});

addButton.addEventListener("click", () => {
  newPlaceForm.reset()
  clearValidation(newPlaceForm, validationConfig);
  openPopup(newCardPopup);
});

newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const button = event.submitter;
  const initialButtonText = button.textContent;
  button.textContent = "Сохранение...";
  button.disabled = true;

  addCard({ name: placeNameInput.value, link: linkInput.value })
    .then((newCard) => {
      addCardToList(newCard);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      newPlaceForm.reset();
      button.textContent = initialButtonText;
      button.disabled = false;
    });
});

profileImage.addEventListener("click", () => {
  avatarImageForm.reset();
  clearValidation(avatarImageForm, validationConfig);
  openPopup(updateAvatarPopup);
});

avatarImageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const avatarInput = avatarImageForm.querySelector(".popup__input");

  const button = event.submitter;
  const initialButtonText = button.textContent;
  button.textContent = "Сохранение...";
  button.disabled = true;

  updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(updateAvatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      avatarImageForm.reset();
      button.textContent = initialButtonText;
      button.disabled = false;
    });
});

popups.forEach((popup) => {
  addPopupEventListeners(popup);
});

function isUserCardOwner(user, card) {
  return user._id === card.owner._id;
}

Promise.all([getUser(), getСards()])
  .then(([user, cardsArray]) => {
    updateProfile(user);
    cardsArray.forEach((card) =>
      addCardToList(card, isUserCardOwner(user, card), card.likes.some(like => like._id === user._id))
    );
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
