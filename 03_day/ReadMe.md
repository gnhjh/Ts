////////////////////////////////////////////////////////////
///////////////////////// DAY 03 ////////////////////////
///////////////////////// USER MANAGER ///////////////////
///////////////// DELETE + DUPLICATES + STORAGE //////////
////////////////////////////////////////////////////////////

OBJECTIVE
Extend the existing registration system into a persistent,
event-driven user manager with proper data integrity handling.

This stage focuses on:

- Data consistency
- State synchronization
- DOM rendering discipline
- Storage lifecycle management

---

NEW REQUIREMENTS

1. DUPLICATE EMAIL PROTECTION

- Prevent adding a user with an existing email
- If duplicate detected → display appropriate error
- Enforce data integrity at the logic layer (not UI layer)

---

2. USER DELETION

Each rendered row must include a "Delete" button.

On delete:

- Remove user from internal array
- Remove corresponding DOM node
- Update localStorage

Event handling must be implemented using:
→ Event Delegation

---

3. LOCAL STORAGE INTEGRATION

- On add → persist to localStorage
- On delete → update localStorage
- On page load → hydrate state from localStorage

Important:
Handle the case where localStorage is empty or null.

---

4. CLEAN RENDERING (NO innerHTML +=)

Rendering must be done using:

- createElement
- appendChild
- or DocumentFragment

Reason:

- Prevent unnecessary reflows
- Avoid losing event listeners
- Improve performance and stability

---

ARCHITECTURAL REQUIREMENTS

- Separate function: renderAllUsers()
- Separate function: renderSingleUser()
- deleteUser method inside UserList class
- Initial load inside DOMContentLoaded
- Clear separation between:
  → State management
  → Storage handling
  → Rendering logic

---

CONSTRAINTS

- JavaScript / TypeScript only
- No external libraries
- No UI frameworks

---

EVALUATION CRITERIA

- Clean architecture
- Proper state management
- Data integrity enforcement
- Correct event handling
- Rendering discipline
- Thoughtful TypeScript usage

---

BONUS (Optional)

- Confirm before deletion
  OR
- Add createdAt timestamp to each user
