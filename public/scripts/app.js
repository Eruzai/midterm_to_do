// Client facing scripts here
$(document).ready(function () {

  const displayItems = (titles) => {
    const titleList = $('.items-container');
    titleList.empty();

    const ul = $('<ul></ul>');

    $.each(titles, (index, title) => {
      const li = $('<li class="item" draggable="true"></li>').text(title);
      ul.append(li);
    });

    titleList.append(ul);
  }

  const displayUser = (email) => {
    const userContainer = $('.user-login')

    userContainer.text(`Logged in as: ${email}`)
  }

  $('.error-msg2').hide();
  $('.error-msg1').hide();
  const displayErrorMessage = (showMessage1) => {
    if (showMessage1) {
      $('.error-msg2').hide();
      $('.error-msg1').show().css('background-color', 'red')
    } else {
      $('.error-msg1').hide();
      $('.error-msg2').show().css('background-color', 'red')
    }
  }
  const fetchCategoryItems = (id) => {
    $.ajax({
      url: `/api/categoryitems?categoryId=${id}`,
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      },
      error: (res) => {
        displayErrorMessage(false)
        displayErrorMessage(false)
      }
    })
  }

  const highlightBtn = (event, categoryId) => {
    // event.preventDefault();

    // Remove background color from all buttons
    $('.list-items').css("background-color", "");

    // fetchCategoryItems(categoryId);
    $(event.target).css("background-color", "red"); // Change background color of the clicked element
  };

  $('.list-items').on("click mouseover", (event) => {
    event.preventDefault();
    const categoryID = event.target.id;
    highlightBtn(event, categoryID);
    fetchCategoryItems(event.target.id);
  })

  $('.list-items')
  .on("dragenter", function(event) {
    event.preventDefault();
    const listID = event.target.id;
    const listContainer = $(this).parents().find('.items-container');
    $(listContainer).attr("name", listID);
    highlightBtn(event, listID);
    fetchCategoryItems(listID);
  })

  $('.items-container')
  .on("dragover", (event) => {
    event.preventDefault();
  })

  $('.items-container')
  .on("dragstart", (event) => {
    const item = event.target.textContent
    event.originalEvent.dataTransfer.setData('text', item);
  })
  .on("drop", function(event) {
    const data = event.originalEvent.dataTransfer.getData('text');
    const catID = $(this).attr("name");
    $.post('/updateitem', {categoryID: catID, title: data})
      .then(() => {
        fetchCategoryItems(catID);
      });
  })

  $('.add-todo-item').on("click", function(event) {
    event.preventDefault();

    const $textObject = $('#title');
    const serialText = $textObject.serialize();

    $.post('/additem', serialText)
      .then((data) => {

        const id = data.data[0].category_id;

        fetchCategoryItems(id);
        highlightBtn(event, id);
      })
      .catch(res => {
        displayErrorMessage(true)
      })
        displayErrorMessage(true)
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

