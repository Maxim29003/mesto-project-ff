const popups = document.querySelectorAll(".popup");

export function getPopupForClassName(className) {
  for (const popup of popups) {
    if (popup.classList.contains(className)) {
      return popup;
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated", "popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
  });
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}
