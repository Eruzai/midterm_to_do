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

  $('.add-todo-item').on("click", (event) => {
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

            // event.preventDefault(); // its broken for now. im not getting logged in because of this preventDefault!!!
            const userEmail = users[index].email;
            displayUser(userEmail);
            $('.user-btn').hide();

            const logoutBtn = $('<button type="submit" class="logout-btn"/>')
            $('.logout').append(logoutBtn)
            logoutBtn.html('Logout')

          });
        });
      }
    })
  }

  fetchUsers();


})
