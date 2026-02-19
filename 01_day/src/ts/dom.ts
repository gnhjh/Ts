export const form = {
  FnameInput: document.getElementById("Fname") as HTMLInputElement,
  LnameInput: document.getElementById("Lname") as HTMLInputElement,
  phoneInput: document.getElementById("phone") as HTMLInputElement,
  addContact: document.getElementById("addContact") as HTMLButtonElement,
};

export const list = {
  contactList: document.getElementById("contact-list") as HTMLDivElement,
  btnShowAll: document.getElementById("btnShowAll") as HTMLButtonElement,
};

export const search = {
  btnClear: document.getElementById("clearSearch") as HTMLButtonElement,
  inputSearch: document.getElementById("search") as HTMLInputElement,
  boxSearchResults: document.getElementById("search-results") as HTMLDivElement,
};
