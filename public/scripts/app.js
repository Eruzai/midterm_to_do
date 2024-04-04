// Client facing scripts here
$(document).ready(function () {

  const displayItems = (titles, ids, completed) => {
    const titleList = $('.items-container');
    titleList.empty();

    const ul = $('<ul class="item-list" style="list-style-type:none;"></ul>');

    $.each(titles, (index, title) => {
      let hidden = "hidden";
      let shown = null;
      if(completed[index] === true) {
        hidden = null;
        shown = "hidden";
      };
      const li = $(`<div name=${ids[index]} class="list-entry"><i name="not-done" class="${shown} fa-regular fa-square fa-xl"></i><i name="done" class="${hidden} fa-regular fa-square-check fa-xl"></i>
      <li class="item" draggable="true">${title}</li>
      <i name="delete-button" class="fa-sharp fa-solid fa-trash fa-xl"></i></div>`);
      ul.append(li);
    });

    titleList.append(ul);
  }

  const displayUser = (email) => {
    const userContainer = $('.user-login')
    userContainer.text(`Logged in as: ${email}`)
  }

  const displayErrorMessage = (showMessage1) => {
    if (showMessage1) {
      $('.error-msg2').hide();
      $('.error-msg1').show();
    } else {
      $('.error-msg1').hide();
      $('.error-msg2').show();
    }
  }

  // shows the item list for a category, if an error isn't present
  const fetchCategoryItems = (id) => {
    $.ajax({
      url: `/api/categoryitems?categoryId=${id}`,
      method: 'GET',
      success: (res) => {
        displayItems(res.titles, res.ids, res.completed);
      },
      error: (res) => {
        displayErrorMessage(false);
      }
    })
  }

  // highlights target element and removes highlight from its siblings
  const highlight = (element) => {
    $(element).addClass('highlighted');
    $(element).siblings().removeClass('highlighted');
  };

  // lists the items in specified list
  $('.list-items').on("click mouseover", (event) => {
    event.preventDefault();
    const categoryID = event.target.id;
    highlight(event.target);
    fetchCategoryItems(event.target.id);
  })

  $('.items-container').on("click", function(event) {
    event.preventDefault();

    const targetName = $(event.target).attr("name");
    const id = $(event.target).parents().attr("name");

    // updates item is_deleted = true, doesn't actually delete item from database. asks for confirmation.
    if(targetName === "delete-button") {
      const item = $(event.target).siblings('.item')[0].textContent;
      const answer = confirm(`Delete ${item} from your list?`);
      if(answer) {
        $.post('/deleteitem', { id })
          .then((data) => {
            const id = data[0].category_id;
            fetchCategoryItems(id);
          });
      }
    }

    // updates item is_completed = true
    if(targetName === "not-done") {
      $.post('/markdone', { id })
        .then((data) => {
          const id = data[0].category_id;
          fetchCategoryItems(id);
        })
    }

    //updates item is_completed = false
    if(targetName === "done") {
      $.post('/marktodo', { id })
        .then((data) => {
          const id = data[0].category_id;
          fetchCategoryItems(id);
        })
    }
  })

  // dragging an item over a list button names the list container after the id of the button (used later to update an item in the database), highlights the button, and displays the appropriate list
  $('.list-items')
    .on("dragenter", function(event) {
      event.preventDefault();
      const listID = event.target.id;
      const listContainer = $(this).parents().find('.items-container');
      $(listContainer).attr("name", listID);
      highlight(event.target);
      fetchCategoryItems(listID);
    });

  // allows dropping into container
  $('.items-container')
  .on("dragover", (event) => {
    event.preventDefault();
  })

  $('.items-container')
  // dragging an item from the list grabs the text content of that item
  .on("dragstart", (event) => {
    const item = $(event.target).parent().attr("name");
    event.originalEvent.dataTransfer.setData('text/plain', item);
  })
  // dropping an item sends a post request to update the item in the database using the data that was being dragged and the category id. the appropriate list is then refreshed to display the change
  .on("drop", function(event) {
    const id = event.originalEvent.dataTransfer.getData('text');
    const categoryID = $(this).attr("name"); // the category id is the name of the list (set when an item is dragged over a list button).
    $.post('/updateitem', { categoryID, id })
      .then((data) => {
        const id = data[0].category_id;
        fetchCategoryItems(id);
      })
  })

  // the form field text is sent via a post request as an object to add the item to the database. the category the item was added to is then highlighted and shown on the page.
  $('.add-todo-item').on("click", function(event) {
    event.preventDefault();

    const $textObject = $('#title');
    const serialText = $textObject.serialize();

    $('.wait-msg').show();
    $.post('/additem', serialText)
      .then((data) => {

        const id = data.data[0].category_id;
        const buttonToHighlight = $(`#${id}`);

        fetchCategoryItems(id);
        highlight(buttonToHighlight);
        $('.wait-msg').hide();
      })
      .catch(res => {
        displayErrorMessage(true);
        $('.wait-msg').hide();
      })
    $('#title').val('');
  })

  const fetchUsers = () => {
    $.ajax({
      url: '/api/users',
      method: 'GET',
      success: (res) => {

        const users = res.users;

        $('.user-btn').each((index, element) => {
          $(element).on('click', (event) => {
            event.preventDefault();

            $.ajax({
              url: '/login',
              method: 'post',
              data: { userId: users[index].id },
              success: () => {
                $('.error-msg1').hide();
                $('.error-msg2').hide();

                const userEmail = users[index].email;
                displayUser(userEmail);
                $('.user-btn').hide();

                const logoutBtn = $('<button type="submit" class="logout-btn"/>')
                $('.logout').append(logoutBtn)
                logoutBtn.html('Logout')

              },
            })
          });
        });
      }
    })
  }
  fetchUsers();
})
