// import React from 'react';
// import App from './App';
// <script src="app.jsx" defer type="text/babel"></script>
// <script src="cartFunctions.js"></script>

// Shopping Cart NavBar (NavBar became Stock)
// started as exercise navBarRemoveEx02

// Ex 2 - remove any item from navbar with less than minStock in stock
// Ex 3 - write out all items with their stock number

// provide a button and use onClick={moveToCart} to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart.
// use React.useState to keep track of Stock items
// list out the Cart items in another column

// write out both the name and the number in stock in format apple:2
function Stock({ menuItems, shoppingCart, minstock, updates }) {
// function Stock({ menuitems, minstock, shoppingCart }) {
  const [stock, setStock] = React.useState(menuItems);
  const [cart, setCart] = React.useState(shoppingCart);
    const { Button } = ReactBootstrap;

    React.useEffect(
      () => {
        console.log(`Stock rendered`);
        console.log(stock);
        // run callback to parent
        // updates(stock, cart);
      }
      // , [stock, cart]
      // , [cart]
    );    

    const listMinStock = stock.filter( item => item.instock >= minstock );

    const moveToCart = e => {
        // let newCart = [];
        // innerHTML should be format name:3
        let [name, num] = e.target.innerHTML.split(":"); 
        let newCart = [];

        // zero items in stock
        if (num <= 0) return;

        // get item with name from stock and update stock
        // let item = stock.filter( (item, index) =>
        //    item.name == name
        //    );    

        // new approach:
        // only if instock is >=  do we move item to Cart and update stock
        // use newStock = stock.map to find "name" and decrease number in stock by 1
        const newStock = stock.map((item) => {
          if (item.name == name) item.instock--;
          // newStock need a "return" value:
          return item;
        });

        // include a name if not in cart yet
        // in the future it should be by id only
        if (!containsItemName(cart, name)) {
            newCart = [...cart, {name:name, incart: 1}]; 
            // setCart([...cart, {name:name, incart: 1}]);
            //shoppingCart = [...shoppingCart, {name:name, incart: 1}]
        } else {
          // increase cart
          // let newCart = cart.map((item) => {
            newCart = cart.map((item) => 
              {
              if (item.name == name) item.incart++;
              return item;
              });

            // setCart([...newCart]);
         
        // shoppingCart = newCart;
        }

        setStock([...newStock]);
        setCart([...newCart]);
        updates(newStock, newCart);

      };

    const updatedList = listMinStock.map((item, index) => {
      return <Button key={index} id={'btnStock'+index} onClick={moveToCart}>{item.name}:{item.instock}</Button>;
    });
  
    // note that React needs to have a single Parent
    return <ul style={{ listStyleType: "none" }}>{updatedList}</ul>;
  }

//   MOVED to app.jsx to be a Global variable:
//   const menuItems = [
//     { name: "apple", instock: 2 },
//     { name: "pineapple", instock: 3 },
//     { name: "pear", instock: 0 },
//     { name: "peach", instock: 3 },
//     { name: "orange", instock: 1 },
//     { name: "grapes", instock: 4 },
//     { name: "strawberry", instock: 5 },
//     { name: "banana", instock: 8 },
//     { name: "tangerine", instock: 6 }
//   ];

function StockTitle () {
  const title = `Items in stock`;

  if (minStock > 0) {
      return `${title} (with minimum of ${minStock})`;
  } else { 
     return `${title}`;
  }
}

// ReactDOM.render(
// <StockTitle />
// ,document.getElementById("stock")
// );

// ReactDOM.render(
//   <Stock menuitems={menuItems} minstock={minStock} shoppingCart={shoppingCart} />
//   ,document.getElementById("stock-items")
// );

  