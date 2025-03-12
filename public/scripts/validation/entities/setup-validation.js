tippy.setDefaultProps({
  theme: "translucent",
  animation: "fade",
  placement: "right",
  arrow: false,
  animation: "shift-away",
  inertia: "true",
  delay: [20, 300],
  maxWidth: 350,
});

const prepareFormData = (rawFormData) => {
  const formData = [...rawFormData].reduce((obj, input) => {
    if (input instanceof HTMLButtonElement) return obj;

    const key = `${input.id}`;
    const value = input.value;

    obj[key] = value;
    return obj;
  }, {});
  console.log({ formData });
  return formData;
};

const fetchValidationResult = async (formData) => {
  console.log("/validate");
  return await fetch("/validate", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "X-CSRF-Token": formData._csrf,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });
};

const highlightErrorFields = (validationResponse) => {
  validationResponse.forEach((validError) => {
    validError.path.forEach((targetPath) => {
      document.getElementsByName(targetPath).forEach((elem) => {
        elem.classList.add("error");
        if (elem._tippy) {
          elem._tippy.setContent(
            elem._tippy.popper.innerText + "\n" + validError.message
          );
        } else {
          tippy("#" + elem.id, {
            content: validError.message,
          });
        }
      });
    });
  });
};

const handleSubmitButtonClick = async (buttonId, formId) => {
  const form = document.getElementById(formId);

  const formData = prepareFormData(form);

  Object.keys(formData)
    .filter((elem) => elem !== "_csrf")
    .forEach((field) => {
      console.log(field, document.getElementsByName(field)[0]);
      const targetField = document.getElementsByName(field)[0];

      targetField.className = "";
      targetField._tippy?.destroy();
    });

  console.log(formData);
  const response = await fetchValidationResult(formData);
  const validationResult = await response.json();

  if (!validationResult.success) {
    highlightErrorFields(validationResult.error.issues);
    console.log(validationResult.error.issues);
  } else {
    form.submit();
  }
};

export function setupSubmitButtonClick(buttonId, formId) {
  document
    .getElementById(formId)
    .addEventListener("submit", (e) => e.preventDefault());

  document
    .getElementById(buttonId)
    .addEventListener("click", () => handleSubmitButtonClick(buttonId, formId));
}
