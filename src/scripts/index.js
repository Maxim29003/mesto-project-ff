import "../pages/index.css";
import { initialCards } from "../components/cards";
import {
  handleCardDelete,
  createCard,
  handleCardLike,
} from "../components/card";
import {
  getPopupForClassName,
  openPopup,
  closePopup,
} from "../components/modal";

const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

function renderCards() {
  placesList.textContent = "";
  initialCards.forEach((item) => {
    placesList.append(
      createCard(
        item.name,
        item.link,
        handleCardDelete,
        handleCardLike,
        handleImagePopup
      )
    );
  });
}

function handleImagePopup(evt) {
  const popupImage = getPopupForClassName("popup_type_image");
  openPopup(popupImage);

  const currentCard = evt.target.closest(".card");
  const imageSrc = currentCard.querySelector(".card__image").src;
  const imageAlt = currentCard.querySelector(".card__image").alt;
  const captionText = currentCard.querySelector(".card__title").textContent;

  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");

  image.src = imageSrc;
  image.alt = imageAlt;
  caption.textContent = captionText;
}

editProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileTitle.textContent = editProfileForm.elements["name"].value;
  profileDescription.textContent =
    editProfileForm.elements["description"].value;
  closePopup();
});

newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = newPlaceForm.elements["place-name"].value;
  const link = newPlaceForm.elements["link"].value;

  initialCards.unshift({
    name,
    link,
  });

  renderCards();
  newPlaceForm.reset();
  closePopup();
});

document.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup();
  }

  if (evt.target.classList.contains("profile__edit-button")) {
    const popupEdit = getPopupForClassName("popup_type_edit");
    openPopup(popupEdit);
    editProfileForm.elements["name"].value = profileTitle.textContent;
    editProfileForm.elements["description"].value =
      profileDescription.textContent;
  }

  if (evt.target.classList.contains("profile__add-button")) {
    const popupNewCard = getPopupForClassName("popup_type_new-card");
    openPopup(popupNewCard);
  }
});

renderCards();
