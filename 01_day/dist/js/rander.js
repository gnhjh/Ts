import { sliceIcon } from "./function.js";
const searchContact = (contact) => {
    const { Fname, Lname, id, phone } = contact;
    return `   
    <div class="contact-item search-result">
      <div class="contact-avatar" style="background: #2ecc71">${sliceIcon(Fname, Lname)}</div>
      <div class="contact-details">
          <strong>${Fname} ${Lname}</strong>
          <span>${phone}</span>
      </div>
      </div>  
              `;
};
const listContact = (contact) => {
    const { Fname, Lname, id, phone } = contact;
    return `
          <div class="contact-item" data-id="${id}">
            <div class="contact-avatar">
              ${sliceIcon(Fname, Lname)}
            </div>
            <div class="contact-details">
              <strong>${Fname} ${Lname}</strong>
              <span>${phone}</span>
            </div>
            <div class="contact-actions">
              <button class="btn-icon">📞</button>
              <button class="btn-icon delete">🗑️</button>
            </div>
          </div>
   `;
};
export function renderContacts(contacts, container, view) {
    const template = view === "list" ? listContact : searchContact;
    container.innerHTML = contacts.map(template).join("");
}
