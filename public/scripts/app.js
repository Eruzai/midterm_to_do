// Client facing scripts here
$(document).ready(function() {

  const displayItems = (titles) => {
    const titleList = $('.items-container');
    titleList.empty();

    const ul = $('<ul></ul>');

    $.each(titles, (index, title) => {
      const li = $('<li class="item" draggable="true"></li>').text(title);
      ul.append(li);
    });

    titleList.append(ul);
  };

  const displayUser = (email) => {
    const userContainer = $('.user-login');

    userContainer.text(`Logged in as: ${email}`);
  };

  $('.error-msg1').hide();
  $('.error-msg2').hide();
  const displayErrorMessage = (showMessage1) => {
    if (showMessage1) {
      $('.error-msg2').hide();
      $('.error-msg1').show().css('background-color', 'red');
    } else {
      $('.error-msg1').hide();
      $('.error-msg2').show().css('background-color', 'red');
    }
  };
  const fetchCategoryItems = (id) => {
    $.ajax({
      url: `/api/categoryitems?categoryId=${id}`,
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      },
      error: (res) => {
        displayErrorMessage(false)
      }
    })
  }

  // accepts DOM element and adds 'highlighted' class to it and removes the class from its siblings
  const highlight = (element) => {
    $(element).addClass('highlighted');
    $(element).siblings().removeClass('highlighted');
  }

  // highlights the target button and displays the appropriate list
  $('.list-items').on("click mouseover", (event) => {
    event.preventDefault();
    highlight(event.target);
    fetchCategoryItems(event.target.id);
  });

  // dragging an item over a list button names the list container after the id of the button (used later to update an item in the database), highlights the button, and displays the appropriate list
  $('.list-items')
  .on("dragenter", function(event) {
    event.preventDefault();
    const listID = event.target.id;
    const listContainer = $(this).parents().find('.items-container');
    $(listContainer).attr("name", listID);
    highlight(event.target);
    fetchCategoryItems(listID);
  })

  // allows items to be dropped in the item list container
  $('.items-container')
    .on("dragover", (event) => {
      event.preventDefault();
    });

  $('.items-container')
  // dragging an item from the list grabs the text content of that item
  .on("dragstart", (event) => {
    const item = event.target.textContent
    event.originalEvent.dataTransfer.setData('text', item);
  })
  // dropping an item sends a post request to update the item in the database using the data that was being dragged and the category id. the appropriate list is then refreshed to display the change
  .on("drop", function(event) {
    const data = event.originalEvent.dataTransfer.getData('text');
    const catID = $(this).attr("name"); // the category id is the name of the list (set when an item is dragged over a list button).
    $.post('/updateitem', {categoryID: catID, title: data})
      .then(() => {
        fetchCategoryItems(catID);
      });
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
        displayErrorMessage(true)
      })
    $('#title').val('');
  });

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

                const userEmail = users[index].email;
                displayUser(userEmail);
                $('.user-btn').hide();

                const logoutBtn = $('<button type="submit" class="logout-btn"/>');
                $('.logout').append(logoutBtn);
                logoutBtn.html('Logout');

              },
            });
          });
        });
      }
    });
  };

  fetchUsers();

});
