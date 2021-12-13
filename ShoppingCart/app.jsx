// import Cart from './cart.jsx'

var minStock = 0;

var menuItems = [
    { name: "apple", instock: 10 },
    { name: "pineapple", instock: 3 },
    { name: "pear", instock: 0 },
    { name: "peach", instock: 3 },
    { name: "orange", instock: 1 },
    { name: "grapes", instock: 4 },
    { name: "strawberry", instock: 5 },
    { name: "banana", instock: 8 },
    { name: "tangerine", instock: 6 }
  ];

// var shoppingCart = [
//     // {name: "tangerine", incart: 1}
//  ];

function App () {
  const [stock, setStock] = React.useState(menuItems);
  const [cart, setCart] = React.useState([]);

  React.useEffect(
    () => {
      console.log(`App Rendered`);

    }
    ,[cart, stock]
  );

  const updates = (newStock, newCart) => {
    setStock(newStock);
    setCart(newCart);
  }

  function currentCart () {
    return cart;
  }

  return (
    <div>
    {/* App structure with web components being called here */}
    <h3 id="stock"><StockTitle /></h3>
    <Stock menuItems={stock} shoppingCart={cart} minstock={minStock} updates={updates} />
    <h3>Shopping Cart</h3>
    <Cart menuItems={stock} shoppingCart={currentCart} updates={updates}  />
    </div>)

}

ReactDOM.render(
  <App />
  ,document.getElementById("root")
);
  
// ReactDOM.render(
//     <div>
//         {/* App structure */}
//         <h3 id="stock">Items in stock</h3>
//         {/* <div id="stock">Items in stock</div> */}
//         <div id="stock-items">No stock</div>
//         <h3 id="cart">Shopping Cart</h3>
//         <div id="cart-items">No items in cart</div>
//     </div>
//     ,document.getElementById("root")
//   );