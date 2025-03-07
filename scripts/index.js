function createCard(name, link, handleCardDelete) {
    const placesList = document.querySelector(".places__list");
    const cardTemplate = document.querySelector("#card-template");
    const card = cardTemplate.content
        .querySelector(".places__item.card")
        .cloneNode(true);
    const cardDeleteButton = card.querySelector(".card__delete-button");

    cardDeleteButton.addEventListener("click", handleCardDelete);

    card.querySelector(".card__image").src = link;
    card.querySelector(".card__image").alt = name;
    card.querySelector(".card__title").textContent = name;

    placesList.append(card);
}

function handleCardDelete(evt) {
    const currentCard = evt.target.closest('.card');
    if (currentCard) {
        currentCard.remove();
    }
}

initialCards.forEach((item) => {
    createCard(item.name, item.link, handleCardDelete);
});
