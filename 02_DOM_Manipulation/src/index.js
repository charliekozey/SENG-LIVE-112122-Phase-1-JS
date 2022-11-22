//BookStore has been moved to data.js 
// console.log(bookStore);

function formatPrice(price) {
  // return `$${price.toFixed(2)}`;
  return '$' + Number.parseFloat(price).toFixed(2);
}

function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name
}

renderHeader(bookStore);

function renderFooter(bookStore) {
  // <div id="store"></div>
  // <div id="number"></div>
  // <div id="address"></div>
  document.querySelector('#store').textContent = bookStore.location;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#address').textContent = bookStore.address;
}

renderFooter(bookStore);

// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

// function accepts book arg that looks
// like this;
// {
//   id: 1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
// }
function renderBook(book) {
  // should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  // </li>
  const li = document.createElement("li");
  li.className = "list-li";
  
  const h3 = document.createElement("h3");
  h3.textContent = book.title;

  const pAuthor = document.createElement("p");
  pAuthor.textContent = `by ${book.author}`;
  
  const pPrice = document.createElement("p");
  pPrice.textContent = formatPrice(book.price);

  const img = document.createElement("img");
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  // add children to the li parent before inserting in DOM
  li.append(h3, pAuthor, pPrice, img);
  // append element to the DOM (so we can see it)
  const list = document.querySelector('#book-list');
  list.append(li);


}
  
// const book = bookStore.inventory[0]
// console.log(book);
// bookStore.inventory.forEach(book => {
//   renderBook(book);
// })

bookStore.inventory.forEach(renderBook)

function removeBook(index) {
  document.querySelectorAll("li.list-li")[index].remove()
}