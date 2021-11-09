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
function Stock({ menuitems, minstock, shoppingCart }) {
    const [cart, setCart] = React.useState(shoppingCart);
    const [stock, setStock] = React.useState(menuItems);
    const { Button } = ReactBootstrap;

    const listMinStock = menuitems.filter( item => item.instock >= minstock );

    const moveToCart = e => {
        // innerHTML should be format name:3
        let [name, num] = e.target.innerHTML.split(":"); 
        
        // zero items in stock
        if (num <= 0) return;

        // get item with name from stock and update stock
        let item = stock.filter((item) => item.name == name);    

        // only if instock is >=  do we move item to Cart and update stock
        // use newStock = stock.map to find "name" and decrease number in stock by 1
        let newStock = stock.map((item, index) => {
          if (item.name == name) {
            item.instock--;
          }

          return item;
        });

        // include a name if not in cart yet
        // in the future it should be by id only
        if (!containsItemName(cart, name)) {
            setCart([...cart, {name:name, incart: 0}]);
        };

        // increase cart
        let newCart = cart.map((item, index) => {
            if (item.name == name) item.incart++;
            return item;
          });        

        setStock([...newStock]);

        // setCart([...cart, name]);
        // setCart(newCart);
        setCart([...cart, ...item])
        // shoppingCart = [...shoppingCart, name];

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
        return `Items in stock (with minimum of ${minStock})`;
    }

    return <h3>{title}</h3>;
}

ReactDOM.render(
  <StockTitle />
  ,document.getElementById("stock")
);

ReactDOM.render(
  <Stock menuitems={menuItems} minstock={minStock} shoppingCart={shoppingCart} />
  ,document.getElementById("stock-items")
);

  