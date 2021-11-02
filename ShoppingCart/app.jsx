var minStock = 2;

var menuItems = [
    { name: "apple", instock: 2 },
    { name: "pineapple", instock: 3 },
    { name: "pear", instock: 0 },
    { name: "peach", instock: 3 },
    { name: "orange", instock: 1 },
    { name: "grapes", instock: 4 },
    { name: "strawberry", instock: 5 },
    { name: "banana", instock: 8 },
    { name: "tangerine", instock: 6 }
  ];

var shoppingCart = [
    {name: "tangerine", incart: 1}
 ];

// function Shopping( {menuitems, shoppingCart}) {
//     const [cart, setCart] = React.useState(shoppingCart);
//     const [stock, setStock] = React.useState(menuItems);
//     const { Button } = ReactBootstrap;


//     return <></>
// }

ReactDOM.render(
    <div>
        {/* App structure */}
        <h3 id="stock">Items in stock</h3>
        {/* <div id="stock">Items in stock</div> */}
        <div id="stock-items">No stock</div>
        <h3 id="cart">Shopping Cart</h3>
        <div id="cart-items">No items in cart</div>
    </div>
    ,document.getElementById("root")
  );
