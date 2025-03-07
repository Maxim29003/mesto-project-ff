const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

function createCard(name, link, handleCardDelete) {
    const card = cardTemplate.content
        .querySelector(".places__item.card")
        .cloneNode(true);
        
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", handleCardDelete);

    const cardImage =  card.querySelector(".card__image");
    cardImage.src = link;
    cardImage.alt = name;

    card.querySelector(".card__title").textContent = name;

    return card
}

function handleCardDelete(evt) {
    const currentCard = evt.target.closest('.card');
    if (currentCard) {
        currentCard.remove();
    }
}

initialCards.forEach((item) => {
    placesList.append(createCard(item.name, item.link, handleCardDelete));
});
