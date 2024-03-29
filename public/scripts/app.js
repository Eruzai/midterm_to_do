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

  $('.fetch-movies').on("click", () => {
    fetchMovies();
  })

  $('.fetch-books').on("click", () => {
    fetchBooks();
  })

  $('.fetch-foods').on("click", () => {
    fetchFoods();
  })

  $('.fetch-products').on("click", () => {
    fetchProducts();
  })
})
