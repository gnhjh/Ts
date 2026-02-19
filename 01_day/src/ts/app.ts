import { Contact, ContactService } from "./class.js";
import { form, list, search } from "./dom.js";
import { inputLenght } from "./function.js";
import { renderContacts } from "./rander.js";

const dataContact = new ContactService();

form.addContact?.addEventListener("click", () => {
  const Fname = form.FnameInput.value.trim();
  const Lname = form.LnameInput.value.trim();
  const phone = form.phoneInput.value;

  if (!inputLenght([Fname, Lname, phone])) return;

  const c = new Contact(Fname, Lname, phone);
  dataContact.add(c);
});

list.btnShowAll?.addEventListener("click", () => {
  renderContacts(dataContact.showAll(), list.contactList, "list");
});

search.inputSearch.addEventListener("input", () => {
  search.boxSearchResults.innerHTML = "";
  const valueSearch = search.inputSearch.value;

  const searchByName = dataContact.searchByName(valueSearch);
  if (searchByName.length === 0) return;

  renderContacts(searchByName, search.boxSearchResults, "search");
});

search.btnClear.addEventListener("click", () => {
  search.boxSearchResults.innerHTML = "";
  search.inputSearch.value = "";
});

list.contactList.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (!target.closest(".delete")) return;

  const contactItem = target.closest(".contact-item") as HTMLElement;
  const id = contactItem.dataset.id;

  if (!id) return;

  dataContact.delete(Number(id));
  contactItem.remove();
});
