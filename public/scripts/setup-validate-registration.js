const prepareFormData = (rawFormData) => {
  const formData = [...rawFormData].reduce((obj, input) => {
    const key = `${input.id}`;
    const value = input.value;

    if (key === "sign-up") return obj;

    obj[key] = value;
    return obj;
  }, {});

  return formData;
};

const fetchValidationResult = async (formData) => {
  return await fetch("/register", {
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
      });
    });
  });
};

document.getElementById("registration").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.getElementById("sign-up").addEventListener("click", async () => {
  const form = document.getElementById("registration");

  const formData = prepareFormData(form);

  Object.keys(formData)
    .filter((elem) => elem !== "_csrf")
    .forEach((field) => {
      console.log(field, document.getElementsByName(field)[0]);
      document.getElementsByName(field)[0].className = "";
    });

  const response = await fetchValidationResult(formData);
  const validationResult = await response.json();

  if (!validationResult.success) {
    highlightErrorFields(validationResult.error.issues);
    console.log(validationResult.error.issues);
  }
});
