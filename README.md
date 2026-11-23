# Web-Project

Khayt Studio – Fashion Club website (IT312, Group G6). Phase 3 due **Nov 21, 11:59 PM**

Live site: https://jouri447.github.io/IT312-Project/home-page.html

---

## Phase 3 – Who does what

### Lara – Home Page + Club Offerings
**Home Page**
- [x] Responsive design: test it on laptop and phone widths. Use `@media` rules in `style.css`. The navigation, images and table must fit small screens. (The viewport `<meta>` is already there.)
- [x] Two themes, each with a different background and font colour (`light.css` and `dark.css`). Add a button on the Home Page to switch between them.
- [x] "Back to Top" button that appears when you scroll down and takes you back to the top when clicked.
- [x] Real-time clock in the footer.

**Club Offerings**
- [x] Show the offerings in a random order when the page loads.
- [x] Add a sort option for alphabetical order and by price, and sort the offerings when the user picks one.

### Reema – About Us
- [x] Validate the "Join Our Team" form:
  - No empty fields.
  - Name can't start with a number.
  - Photo field accepts images only.
  - Birth year must be 2008 or earlier.
- [x] If the form is valid, show an alert that thanks the sender by name.

### Ghadha – Request to Join + Offering Evaluation
**Request to Join**
- [x] Validate the form: an offering is selected, the name is a full name with no numbers or ?, ! or @, and the preferred date is in the future.
- [x] When the form is valid, show a confirm box: stay on the page to add another request, or go back to the Member Dashboard.
- [x] Show all the requests added while staying on the page (they are not saved, so they disappear after leaving).

**Offering Evaluation**
- [x] Validate the form (no empty fields).
- [x] If the rating is good, show a thank-you message. If it's low, show an apology message.
- [x] Then go back to the Member Dashboard.

### Jouri – Manager pages + Hosting
- [x] Manager Dashboard shows the offerings saved in local storage.
- [x] Add a New Offering: validation, saves to local storage as an array of objects, alert, clears the form.
- [x] Manage Leaders & Instructors: checkbox list from an array of objects, delete with alert/confirm, add form with validation.
- [x] `Link.txt` and GitHub Pages.

### Extra functionalities (from Phase 1)
- [x] Notifications: the bell opens a notifications panel on every page (`notifications.js`).
- [x] Favorites: save offerings with the bookmark button on Club Offerings (saved in local storage).

---

## Rules
- Use JavaScript from the lecture slides where possible: `getElementById`, `onclick`/`onsubmit`, `innerHTML`, `.value`, `alert`/`confirm`, `setTimeout`/`setInterval`, `localStorage` with `JSON`, and RegEx.
- Put your JS in its own file named after your page (for example `about-us.js`). Link it at the end of `<body>` with `<script src="about-us.js"></script>`. See `add-offering.js` for an example.
- `style.css` is shared. Add your new CSS at the **end** and don't change other people's rules.
- Test your page in the browser before uploading, and check that the HTML still passes https://validator.w3.org/ with no errors.
- Upload your files to this repo **early** (Add file → Upload files), so the live site can be checked before the deadline.
- **Don't change the uploaded website after the deadline.**
