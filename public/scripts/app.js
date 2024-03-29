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

  const fetchMovies = () => {
    $.ajax({
      url: '/api/categoryitems?categoryId=1',
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
  }

  const fetchBooks = () => {
    $.ajax({
      url: '/api/categoryitems?categoryId=2',
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
  }

  const fetchFoods = () => {
    $.ajax({
      url: '/api/categoryitems?categoryId=3',
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
  }

  const fetchProducts = () => {
    $.ajax({
      url: '/api/categoryitems?categoryId=4',
      method: 'GET',
      success: (res) => {
        displayItems(res.titles);
      }
    })
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
    fetchMovies();
  })

  $('.fetch-books').on("click", (event) => {
    event.preventDefault();
    fetchBooks();
  })

  $('.fetch-foods').on("click", (event) => {
    event.preventDefault();
    fetchFoods();
  })

  $('.fetch-products').on("click", (event) => {
    event.preventDefault();
    fetchProducts();
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
