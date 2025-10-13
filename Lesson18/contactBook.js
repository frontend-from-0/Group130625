/*
===========================================================
  SIMPLE CONTACT BOOK APPLICATION
===========================================================
In this project, you'll create a Contact Book to store and
manage basic info: name, phone, and email.

You'll practice:
1. Arrays and objects
2. Loops (for, for-of, findIndex, etc.)
3. Conditionals (if-else)
4. Basic CRUD (Create, Read, Update, Delete) functionality

Below is a step-by-step guide, with sample code and 
comments explaining what each section does. Run this file
in Node.js or in your browser's console to see the output.
*/

/*
-----------------------------------------------------------
  STEP 1: Setup and Initial Data
-----------------------------------------------------------
1. Create an array named 'contacts' with a few initial 
   sample contacts.
2. Each contact is an object with 'name', 'phone', and 
   'email' properties.
*/
const contacts = [
  {
    name: 'Hasan',
    phone: '537 732 93 84',
    email: 'hsnkan7@gmail.com',
  },
];
/*
-----------------------------------------------------------
  STEP 2: Display All Contacts
-----------------------------------------------------------
Function: displayAllContacts()
- Loops over the 'contacts' array.
- Logs a descriptive string for each contact.

Example output:
  Name: Alice, Phone: 123-456-7890, Email: alice@example.com
*/

function displayAllContacts() {
  console.log('Displaying all available contacts...');
  for (const contact of contacts) {
    console.log(
      `Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`,
    );
  }
  console.log('End of contacts.');
  console.log('');
  console.log('');
}

/*
-----------------------------------------------------------
  STEP 3: Add a New Contact
-----------------------------------------------------------
Function: addContact(name, phone, email)
- Creates a new contact object and pushes it into 'contacts'.
- Checks if a contact with the same name already 
  exists before adding. If found, logs a warning and returns.
- Logs "Contact added successfully." if everything is good.
*/
function addContact(name, phone, email) {
  console.log('Adding contact...');
  for (let i = 0; i < contacts.length; i++) {
    const currentlySelectedContact = contacts[i];

    if (currentlySelectedContact.name === name) {
      console.warn('Contact already exists!');
      console.log('');
      console.log('');
      return;
    }
  }

  contacts.push({ name, phone, email }); // = contacts.push({name: name, phone: phone, email:email})
  console.log('Contact added successfully.');
  console.log('Finished adding contact.');
  console.log('');
  console.log('');
}

addContact('Elif', '+90 000 000 00 00', 'elif2001cetin@gmail.com');
addContact('John', '+90 000 000 00 00', 'john@gmail.com');
addContact('John', '+90 000 000 00 00', 'john@gmail.com');

/*
-----------------------------------------------------------
  STEP 4: View a Contact by Name
-----------------------------------------------------------
Function: viewContact(name)
- Loops over 'contacts' to find one matching 'name'.
- Logs the contact info if found.
- Otherwise, logs: "No contact found with the name: <name>"
*/

function viewContact(name) {
  console.log(`Looking for ${name} in the contact book...`);
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.name === name) {
      console.log(
        `Contact details: 'Phone: ${contact.phone}, Email: ${contact.email}'`,
      );
      console.log('');
      console.log('');
      return;
    }
  }
  console.log(`No contact found with the name: ${name}.`);
  console.log('');
  console.log('');
}

viewContact('Hasan');

viewContact('Jane');
viewContact('John');

/*
-----------------------------------------------------------
  STEP 5: Update a Contact
-----------------------------------------------------------
Function: updateContact(name, newPhone, newEmail)
- Finds the contact by name and updates phone + email.
- Logs "Contact updated successfully." if found.
- Otherwise, logs: "No contact found with the name: <name>"
*/
function updateContact(name, newPhone, newEmail) {
  console.log(`Updating contact ${name} in the contact book...`);
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === name) {
      contacts[i].phone = newPhone;
      contacts[i].email = newEmail;
      console.log('Contact updated successfully.');
      console.log(
        `New contact details: 'Phone: ${contacts[i].phone}, Email: ${contacts[i].email}'`,
      );
      console.log('');
      console.log('');
      return;
    }
  }
  console.log(`No contact found with the name: ${name}.`);
  console.log('');
  console.log('');
}
updateContact('Hasan', '34567', 'bbb@gmail.com');
updateContact('Jake', '78574957', 'fjdkfj@gmail.com');

/*
-----------------------------------------------------------
  STEP 6: Remove a Contact
-----------------------------------------------------------
Function: removeContact(name)
- Finds the index of the contact with 'name' using 
  findIndex() or a loop.
- Splices it from the array if found.
- Logs "Contact removed successfully." if found.
- Otherwise, logs: No contact found with the name: <name>"
*/
function removeContact(name) {
  console.log(`Deleting contact with name ${name}...`);
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === name) {
      contacts.splice(i, 1);

      console.log('Contact deleted successfully.');

      console.log('');
      console.log('');
      return;
    }
  }
  console.log(`No contact found with the name: ${name}`);
}

removeContact('hasan');
removeContact('Hasan');
/*
-----------------------------------------------------------
  STEP 7: Testing Our Functions
-----------------------------------------------------------
Below are some sample function calls to demonstrate the 
Contact Book in action.
*/

displayAllContacts();

/*
-----------------------------------------------------------
  OPTIONAL ENHANCEMENTS:
-----------------------------------------------------------
1. Partial Name Search:
   - Instead of strict ===, use .includes() for the name check.

2. Sort Contacts:
   - Add a function to sort contacts alphabetically by name.
3. Search by multiple fields:
   - e.g., find a contact by phone number or email.
*/

function searchContact(searchTerm) {
  console.log(`Looking for '${searchTerm}' in the contact book...`);
  let counter = 0;

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (
      contact.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      contact.phone
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      contact.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) {
      console.log(
        `Contact details: Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}'`,
      );
      counter++;
    }
  }

  if (counter === 0) {
    console.log(`No contact found with followig details: ${searchTerm}.`);
  }

  console.log('');
  console.log('');
}

searchContact('JO');

searchContact('@gmail.com');



function sanitizePhone (phone) {
  const numbers = ['0', '1', '2', '3', '9'];// 
  let sanitized = '';
  for (let i = 0; i < phone.length; i++) {
    if (numbers.includes(phone[i])) {
      sanitized = sanitized + phone[i];
    }
  }

  return sanitized;
}


const res = sanitizePhone ('+ 90   92312 - 1321321 -232');
console.log(res);