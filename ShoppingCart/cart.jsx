// export default Cart = ( {menuitems, shoppingCart}) => {
function Cart ( {menuItems, shoppingCart, updates}) {
    const [stock, setStock] = React.useState(menuItems);
    const [cart, setCart] = React.useState(shoppingCart);
    const { Button } = ReactBootstrap;

    React.useEffect(
      () => {
        console.log(`Cart rendered`);
        
        // run callback to parent
        updates(stock, cart);
      }
      , [cart, stock]
    );

    const removeFromCart = e => {
        // innerHTML should be format name:3
        let [name, num] = e.target.innerHTML.split(":"); 

        // only if instock is >=  do we move item to Cart and update stock
        // use newStock = stock.map to find "name" and decrease number in stock by 1
        let newStock = stock.map((item, index) => {
          if (item.name == name) item.instock++;
          return item;
        });        
        
        let newCart = cart.splice(e.target.id, 1);

        setStock([...newStock]);
        setCart(newCart);

        // shoppingCart.splice(e.target.id, 1);
    }

    const updatedList = shoppingCart.map((item, index) => {
      return <Button key={index} id={'btnCart'+index} onClick={removeFromCart}>{item.name}:{item.incart}</Button>;
    });
  
    // note that React needs to have a single Parent
    return <ul style={{ listStyleType: "none" }}>{updatedList}</ul>;
  }


// ReactDOM.render(
// <Cart menuitems={menuItems} shoppingCart={shoppingCart} />
// ,document.getElementById("cart-items")
// );  