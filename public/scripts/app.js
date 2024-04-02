// Client facing scripts here
$(document).ready(function () {

  const displayItems = (titles) => {
    const titleList = $('.items-container');
    titleList.empty();

    const ul = $('<ul></ul>');

    $.each(titles, (index, title) => {
      const li = $('<li></li>').text(title);
      ul.append(li);
    });

    titleList.append(ul);
  }

  const displayUser = (email) => {
    const userContainer = $('.user-login')

    userContainer.text(`Logged in as: ${email}`)
  }

  const fetchCategoryItems = (id) => {
    $.ajax({
      url: `/api/categoryitems?categoryId=${id}`,
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
  }

  const highlightBtn = (event, categoryId) => {
    event.preventDefault();

    // Remove background color from all buttons
    $('.fetch-movies, .fetch-books, .fetch-foods, .fetch-products').css("background-color", "");

    fetchCategoryItems(categoryId);
    $(event.target).css("background-color", "red"); // Change background color of the clicked element
  };

  $('.fetch-movies').on("click", (event) => {
    event.preventDefault();
    highlightBtn(event, 1);
  })

  $('.fetch-books').on("click", (event) => {
    event.preventDefault();
    highlightBtn(event, 2);
  })

  $('.fetch-foods').on("click", (event) => {
    event.preventDefault();
    highlightBtn(event, 3);
  })

  $('.fetch-products').on("click", (event) => {
    event.preventDefault();
    highlightBtn(event, 4);
  })

  $('.add-todo-item').on("click", function(event) {
    event.preventDefault();
    const $textObject = $(this).find('#title');
    const serialText = $textObject.serialize();
    $.post('/additem', serialText)
      .then((data) => {
        const id = data.data[0].category_id;
        fetchCategoryItems(id);
      });
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

  $('.error-msg1').hide()
  $('.error-msg2').hide()

  $.ajax({
    url: '/additem',
    type: 'POST',
    success: (res) => {
      if (!res.status) {
        // If user try to add an item while not logged in, display error message
        $('.add-todo-item').on("click", () => {
          $('.error-msg1').show()
        })
      }
    },
  });
})
