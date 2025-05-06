export const enableValidation = (validationConfig) => {
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(
                formElement,
                inputElement,
                validationConfig.inputErrorClass,
                validationConfig.errorClass
            );
            toggleButtonState(
                formElement,
                buttonElement,
                validationConfig.inactiveButtonClass
            );
        });
    });
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const showInputError = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validity.patternMismatch
        ? inputElement.dataset.errorMessage
        : inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const toggleButtonState = (form, buttonElement, inactiveButtonClass) => {
    if (!form.checkValidity()) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};

export const clearValidation = (form, validationConfig) => {
    const inputElements = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(
        validationConfig.submitButtonSelector
    );

    toggleButtonState(form, submitButton, validationConfig.inactiveButtonClass);

    inputElements.forEach((inputElement) => {
        hideInputError(
            form,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass
        );
    });
};
