import { deleteLike, setLike } from "../scripts/api";

const cardTemplate = document.querySelector("#card-template");

function canDeleteCard(userId, card) {
  return userId === card.owner._id;
}

function hasUserLikedCard(userId, card) {
  return card.likes.some((like) => like._id === userId);
}

function createCard(
  card,
  userId,
  handleCardDelete,
  handleImagePopup,
  handleCardLike
) {
  const newCard = cardTemplate.content
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".card__delete-button");

  if (canDeleteCard(userId, card)) {
    cardDeleteButton.addEventListener("click", () => {
      handleCardDelete(newCard, card._id);
    });
  } else {
    cardDeleteButton.style.visibility = "hidden";
  }

  const cardLikeCount = newCard.querySelector(".card__like-count");
  cardLikeCount.textContent = card.likes.length;

  const cardLikeButton = newCard.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", (evt) =>
    handleCardLike(evt, card._id, cardLikeCount)
  );

  if (hasUserLikedCard(userId, card)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const cardName = newCard.querySelector(".card__title");
  cardName.textContent = card.name;

  cardImage.addEventListener("click", () => {
    handleImagePopup(cardImage, cardName.textContent);
  });

  return newCard;
}

function handleCardLike(evt, cardId, cardLikeCount) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : setLike;
  likeMethod(cardId)
    .then((data) => {
      cardLikeCount.textContent = data.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
}

export { createCard, handleCardLike };
