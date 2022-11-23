
function formatPrice(price) {
  // return `$${price.toFixed(2)}`;
  return '$' + Number.parseFloat(price).toFixed(2);
}

///////////////////
// render functions
///////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');

  btn.textContent = 'Delete';
  btn.addEventListener('click', (e) => {
    // e.target.parentNode.remove()
    li.remove()
  })

  li.append(h3, pAuthor, pPrice, img, btn);

  document.querySelector('#book-list').append(li);
}

///////////////////
// Event Handlers
///////////////////

const toggleFormButton = document.querySelector('#toggleForm');
const newBookForm = document.querySelector('#book-form');
let bookFormVisible = false;

// hide and show the new book form when toggle buton is clicked
toggleFormButton.addEventListener('click', (e) => {
  bookFormVisible = !bookFormVisible;
  newBookForm.classList.toggle('collapsed');
  toggleFormButton.textContent = bookFormVisible ? 'Hide Book Form' : 'New Book';
  // equivalent to the below
  // if (bookFormVisible) {
  //   toggleFormButton.textContent = 'Hide Book Form';
  // } else {
  //   toggleFormButton.textContent = 'New Book';
  // }
});

// also hide the form when it's visible and the escape key is pressed

window.addEventListener('keydown', (e) => {
  console.log(e)
  if (e.key === "Escape" && bookFormVisible) {
    bookFormVisible = !bookFormVisible;
    newBookForm.classList.toggle('collapsed');
    toggleFormButton.textContent = bookFormVisible ? 'Hide Book Form' : 'New Book';
  }
})

// handle submitting new book form
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // invoke renderBook to add the book data from the form into the DOM
  // renderBook expects a book object as an argument, so we need to build that
  // book should look something like this:
  // {
  //   id:1,
  //   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
  //   author: 'Marjin Haverbeke',
  //   price: 10.00,
  //   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
  //   inventory: 10,
  //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
  // }
  console.dir(e.target)
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: Number.parseFloat(e.target.price.value),
    reviews: [],
    inventory: Number.parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
  renderBook(book);
});

const langSelect = document.querySelector('#form-language')
langSelect.addEventListener('change', (e) => {
  console.log(e.target.value);
})

////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);
  
