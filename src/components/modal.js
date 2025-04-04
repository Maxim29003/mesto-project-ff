export function addPopupEventListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", (evt) => {
    closePopup(popup);
  });

  popup.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("popup__content")) {
      closePopup(evt.target);
    }
  });
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closePopup(popup) {
  const openPopup = popup || document.querySelector(".popup_is-opened");
  if (openPopup) {
    openPopup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscapeKey);
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}
