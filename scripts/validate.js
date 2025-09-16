function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    // estado inicial del botón //

    button.disabled = !form.checkValidity();
    if (button.disabled) {
      button.classList.add(config.inactiveButtonClass);
    } else {
      button.classList.remove(config.inactiveButtonClass);
    }

    // validación en tiempo real del input //

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorEl = input.nextElementSibling;

        if (!input.validity.valid) {
          input.classList.add(config.inputErrorClass);
          errorEl.textContent = input.validationMessage;
          errorEl.classList.add(config.errorClass);
        } else {
          input.classList.remove(config.inputErrorClass);
          errorEl.textContent = "";
          errorEl.classList.remove(config.errorClass);
        }

        button.disabled = !form.checkValidity();
        if (button.disabled) {
          button.classList.add(config.inactiveButtonClass);
        } else {
          button.classList.remove(config.inactiveButtonClass);
        }
      });

      // blur para validar al salir del input //

      input.addEventListener("blur", () => {
        const errorEl = input.nextElementSibling;
        if (!input.validity.valid) {
          input.classList.add(config.inputErrorClass);
          errorEl.textContent = input.validationMessage;
          errorEl.classList.add(config.errorClass);
        } else {
          input.classList.remove(config.inputErrorClass);
          errorEl.textContent = "";
          errorEl.classList.remove(config.errorClass);
        }
      });
    });
  });
}

// Resetear estado del formulario Add Image //

function resetAddImagePopupFormState() {
  const form = document.querySelector(".add-image-popup__form");
  if (!form) return;

  const inputs = Array.from(form.querySelectorAll(".add-image-popup__input"));
  const button = form.querySelector(".add-image-popup__save-button");

  inputs.forEach((input) => {
    input.classList.remove("add-image-popup__input_type_error");
    const errorEl = input.nextElementSibling;
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("add-image-popup__input-error_active");
    }
  });

  form.reset();

  if (button) {
    button.disabled = true;
    button.classList.add("add-image-popup__save-button_disabled"); // si tienes estilo para deshabilitado
  }
}
