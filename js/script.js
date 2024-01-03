/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   // Calculate indexes of first and last item to display on page
   const start = (page * itemsPerPage) - itemsPerPage;
   const end = (page * itemsPerPage) - 1;
   // Get list of students
   const studentList = document.querySelector('.student-list');
   // Clear innerHTML to reset page before proceeding
   studentList.innerHTML = '';
   // Add students to page
   for (let i = 0; i < list.length; i++) {
      // Generate HTML data for each student
      if (i >= start && i <= end) {
         const student = list[i];
         studentName = `${student.name.first} ${student.name.last}`;
         studentHTML = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${student.picture.large} alt="Profile Picture of ${studentName}">
                  <h3>${studentName}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li>
         `
         // Append HTML to end of studentList
         studentList.insertAdjacentHTML('beforeend', studentHTML);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   // Calculate number of buttons required
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('.link-list')
   // Add required buttons to pagination list
   linkList.innerHTML = '';
   for (let i = 1; i <= numberOfButtons; i++) {
      // Generate HTML for new button
      const buttonHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
      `
      linkList.insertAdjacentHTML('beforeend', buttonHTML);
   }
   // Set first button to active
   const firstButton = linkList.querySelector('button');
   firstButton.classList.add('active');
   
   // Add event listener to show a new page of students when the user clicks one of the buttons
   linkList.addEventListener('click', (e) => {
      // Find active button for comparison with clicked button
      const activeButton = linkList.querySelector('.active');
      // Find closest button ancestor of target of click event
      const clickedButton = e.target.closest('button');
      
      if (clickedButton) {
         // If a button is already active and a button was clicked, deactivate the active button
         if (activeButton && clickedButton) {
            activeButton.classList.remove('active');
         }
         // Activate the clicked button and show associated page
         if (clickedButton) {
            clickedButton.classList.add('active');
            // console.log(clickedButton.textContent);
            showPage(list, clickedButton.textContent);
         }
      }
   });

}

function addSearch(list) {
   // Append search bar to page header
   const searchHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name..."></input>
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></img></button>
      </label>
   `
   const header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeend', searchHTML);
   
   // Store searchLabel as variable for later navigation
   const searchLabel = header.querySelector('.student-search');

   // Add funcion to dynamically search the students based on search bar input
   function filterStudents() {
      const userInput = document.querySelector('#search').value.toLowerCase();
      console.log(userInput);
      let newData = [];
      // Add students with matching names to the new list of students
      for (let i = 0; i < list.length; i++) {
         const student = list[i];
         const studentName = `${student.name.first} ${student.name.last}`.toLowerCase();
         if (studentName.includes(userInput)) {
            console.log(studentName, userInput);
            newData.push(student);
         }
      }
      console.log(newData);
      // Update page to either show matching results, or a blank "No Results" page
      if (newData.length > 0) {
         // Update pagination with new list
         addPagination(newData);
         // Show first page of new data
         showPage(newData, 1);
      } else {
         document.querySelector('.student-list').innerHTML = `<h2>No results found.</h2>`;
         document.querySelector('.link-list').innerHTML = '';
      }
   }
   // Add event handler to automatically filter as the user types
   const searchBar = searchLabel.querySelector('#search');
   searchBar.addEventListener('keyup', filterStudents);
   
   // Add event handler or manual search button, for if copy-pasting text fails to trigger the search
   const searchButton = searchLabel.querySelector('button');
   searchButton.addEventListener('click', filterStudents);
   
}

// Call functions
addPagination(data);
showPage(data, 1);
addSearch(data);