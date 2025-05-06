import { deleteLike, setLike } from "../scripts/api";

const cardTemplate = document.querySelector("#card-template");

function createCard(
  card,
  isDeletable,
  handleCardDelete,
  handleImagePopup
) {
  const newCard = cardTemplate.content
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".card__delete-button");

  if (isDeletable) {
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
  const isLiked = evt.target.classList.toggle("card__like-button_is-active");
  if (isLiked) {
    setLike(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка установки лайка:", err);
      });
  } else {
    deleteLike(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка удаления лайка:", err);
      });
  }
}

export { createCard };
