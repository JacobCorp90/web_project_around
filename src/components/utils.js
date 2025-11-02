export function openImagePopup({ src, alt, title }) {
  const popup = document.querySelector(".image-popup");
  const img = popup.querySelector(".image-popup__image");
  const caption = popup.querySelector(".image-popup__title");

  img.src = src;
  img.alt = alt ?? "";
  caption.textContent = title ?? "";

  popup.classList.remove("image-popup_closed");
}

export function closePopup(popupElement) {
  if (popupElement.classList.contains("popup")) {
    popupElement.classList.add("popup_closed");
  }
  if (popupElement.classList.contains("add-image-popup")) {
    popupElement.classList.add("add-image-popup_closed");
  }
  if (popupElement.classList.contains("image-popup")) {
    popupElement.classList.add("image-popup_closed");
  }
}