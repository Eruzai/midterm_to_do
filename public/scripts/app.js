// Client facing scripts here
$(document).ready(function() {

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

  const fetchCategoryItems = (id) => {
    $.ajax({
      url: `/api/categoryitems?categoryId=${id}`,
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
  }

  $('.fetch-movies').on("click", (event) => {
    event.preventDefault();
    fetchCategoryItems(1);
  })

  $('.fetch-books').on("click", (event) => {
    event.preventDefault();
    fetchCategoryItems(2);
  })

  $('.fetch-foods').on("click", (event) => {
    event.preventDefault();
    fetchCategoryItems(3);
  })

  $('.fetch-products').on("click", (event) => {
    event.preventDefault();
    fetchCategoryItems(4);
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
  })
})
