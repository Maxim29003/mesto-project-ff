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
  cardDeleteButton.addEventListener("click", () => {
    handleCardDelete(card);
  });

  const cardLikeButton = card.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleCardLike);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const cardName = card.querySelector(".card__title");
  cardName.textContent = name;

  cardImage.addEventListener("click", () => {
    handleImagePopup(cardImage, cardName.textContent);
  });

  return card;
}

function handleCardDelete(card) {
  card.remove();
}

function handleCardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { handleCardDelete, createCard, handleCardLike };
