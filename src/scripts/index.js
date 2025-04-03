import "../pages/index.css";
import { initialCards } from "../components/cards";
import { handleCardDelete, createCard } from "../components/card";

const placesList = document.querySelector(".places__list");

initialCards.forEach((item) => {
  placesList.append(createCard(item.name, item.link, handleCardDelete));
});
