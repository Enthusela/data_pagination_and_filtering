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

/* Create a new function called showPage and give it two parameters: 
   list (array of student objs)
   page (page number)
*/

function showPage(list, page) {
   // Calculate indexes of first and last item to display on page
   const start = (page * itemsPerPage) - itemsPerPage;
   const end = (page * itemsPerPage) - 1;
   // Get list of students and clear innerHTML to reset page before proceeding
   const studentList = document.querySelector('.student-list');
   // Add elements of list to page
   for (let i = start; i <= end; i++) {
      // Use string literal to generate HTML data for new item
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/


// Call functions
showPage(data, 1);