# Web-Project

Khayt Studio – Fashion Club website (IT312, Group G6). Phase 3 due **Nov 21, 11:59 PM**

Live site: https://jouri447.github.io/IT312-Project/home-page.html

---

## Phase 3 – Who does what

### Lara – Home Page + Club Offerings
**Home Page**
- [ ] Responsive design: test it on laptop and phone widths. Use `@media` rules in `style.css`. The navigation, images and table must fit small screens. (The viewport `<meta>` is already there.)
- [ ] Two themes, each with a different background and font colour. Add a button on the Home Page to switch between them.
- [ ] "Back to Top" button that appears when you scroll down and takes you back to the top when clicked.
- [ ] Real-time clock in the footer.

**Club Offerings**
- [ ] Show the offerings in a random order when the page loads.
- [ ] Add a sort option for alphabetical order and by price, and sort the offerings when the user picks one.

### Reema – About Us
- [ ] Validate the "Join Our Team" form:
  - No empty fields.
  - Name can't start with a number.
  - Photo field accepts images only.
  - Birth year must be 2008 or earlier.
- [ ] If the form is valid, show an alert that thanks the sender by name.

### Ghadha – Request to Join + Offering Evaluation
**Request to Join**
- [ ] Validate the form (no empty fields, and inputs must match their type).
- [ ] When the form is valid, show a confirm box: stay on the page to add another request, or go back to the Member Dashboard.
- [ ] Show the added requests on the page.

**Offering Evaluation**
- [ ] Validate the form (no empty fields).
- [ ] If the rating is good, show a thank-you message. If it's low, show an apology message.
- [ ] Then go back to the Member Dashboard.

### Jouri – Manager pages + Hosting
- [x] Manager Dashboard shows the offerings saved in local storage.
- [x] Add a New Offering: validation, saves to local storage as an array of objects, alert, clears the form.
- [x] Manage Leaders & Instructors: checkbox list from an array of objects, delete with alert/confirm, add form with validation.
- [x] `Link.txt` and GitHub Pages.

---

## Rules
- Only use JavaScript from the lecture slides: `getElementById`, `onclick`/`onsubmit`, `innerHTML`, `.value`, `alert`/`confirm`, `setTimeout`/`setInterval`, `localStorage` with `JSON`, and RegEx.
- Put your JS in its own file named after your page (for example `about-us.js`). Link it in `<head>` with `<script src="about-us.js"></script>`. See `add-offering.js` for an example.
- `style.css` is shared. Add your new CSS at the **end** and don't change other people's rules.
- Test your page in the browser before uploading, and check that the HTML still passes https://validator.w3.org/ with no errors.
- Upload your files to this repo **early** (Add file → Upload files), so the live site can be checked before the deadline.
- **Don't change the uploaded website after the deadline.**
