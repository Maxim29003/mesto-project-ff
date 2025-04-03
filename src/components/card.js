const cardTemplate = document.querySelector("#card-template");

function createCard(
  name,
  link,
  handleCardDelete,
  handleCardLike,
  handleImagePopup
) {
  const card = cardTemplate.content
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", handleCardDelete);

  const cardLikeButton = card.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleCardLike);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", handleImagePopup);

  card.querySelector(".card__title").textContent = name;

  return card;
}

function handleCardDelete(evt) {
  const currentCard = evt.target.closest(".card");
  if (currentCard) {
    currentCard.remove();
  }
}

function handleCardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { handleCardDelete, createCard, handleCardLike };
