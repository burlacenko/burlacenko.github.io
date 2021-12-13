// export default Cart = ( {menuitems, shoppingCart}) => {
function Cart ( {menuItems, shoppingCart, updates}) {
    const [stock, setStock] = React.useState(menuItems);
    const [cart, setCart] = React.useState(shoppingCart());
    const { Button } = ReactBootstrap;

    React.useEffect(
      () => {
        console.log(`Cart rendered`);
        console.log(cart);
        // run callback to parent
        // updates(stock, cart);
      }
      ,[cart, stock]
    );

    function makeNewCart (name) {
      let result = [];

      let curCart = [];
      curCart = shoppingCart();
      
      if (!containsItemName(curCart, name)) {
        result = [...curCart, {name:name, incart: 1}];
        // setCart([...cart, {name:name, incart: 1}]);
      //shoppingCart = [...shoppingCart, {name:name, incart: 1}]
      } else {
        result = curCart.map((item) => {
          if (item.name == name) item.incart--;
          return item;
          });
      }

      return result;

    }

    // function getQtde(aCart, name) {
    //   const result = aCart.filter( (item) => {
    //     if (item.name == name) return item.incart;
    //     });
      
    //   if (typeof result === undefined) {
    //     result = 0;
    //   }

    //   return result;
    // }

    const removeFromCart = e => {
        // innerHTML should be format name:3
        let [name, num] = e.target.innerHTML.split(":");
        
        // let curCart = [];
        // we new to make sure to get cart data from parent
        let curCart = shoppingCart();
        num = getQty(curCart, name);
        
        let newCart = [];

        if (num <= 0) return;
        
        // only if instock is >=  do we move item to Cart and update stock
        // use newStock = stock.map to find "name" and decrease number in stock by 1
        const newStock = stock.map((item) => {
          if (item.name == name) item.instock++;
          return item;
          }
        );        

        // let newCart = cart.splice(e.target.id, 1);

        // if (!containsItemName(cart, name)) {
        //     newCart = [...cart, {name:name, incart: 1}];
        //     // setCart([...cart, {name:name, incart: 1}]);
        //   //shoppingCart = [...shoppingCart, {name:name, incart: 1}]
        //   } else {
        //     newCart = cart.map((item) => {
        //       if (item.name == name) item.incart--;
        //       return item;
        //       });
        //   }

        newCart = makeNewCart(name);
        
        setStock([...newStock]); 
        setCart([...newCart]);
        updates(newStock, newCart);  
    }

    const updatedList = shoppingCart().map((item, index) => {
      return <Button key={index} id={'btnCart'+index} onClick={removeFromCart}>{item.name}:{item.incart}</Button>;
    });
  
    // note that React needs to have a single Parent
    return <ul style={{ listStyleType: "none" }}>{updatedList}</ul>;
  }



// ReactDOM.render(
// <Cart menuitems={menuItems} shoppingCart={shoppingCart} />
// ,document.getElementById("cart-items")
// );  