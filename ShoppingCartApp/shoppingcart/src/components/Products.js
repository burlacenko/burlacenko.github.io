import React from 'react';
// import ReactBootstrap from 'react-bootstrap'; // requires "npm install react-bootstrap"
import axios from 'axios'; // requires "npm install axios"
import {
  Card,
  Accordion,
  Button,
  Container,
  Row,
  Col,
  Image,
  Input,
} from 'react-bootstrap';

import './Products.css';


// simulate getting products from DataBase
const products = [
    { name: "Apples", country: "Italy", cost: 3, instock: 10 },
    { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
    { name: "Beans", country: "USA", cost: 2, instock: 5 },
    { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
  ];


  // //=========Cart=============
  // const Cart = (props) => {
  //   // const { Card, Accordion, Button } = ReactBootstrap;
  //   let data = props.location.data ? props.location.data : products;
  //   console.log(`data:${JSON.stringify(data)}`);
 
  //   return <Accordion defaultActiveKey="0">{list}</Accordion>;
  // };
  
  const useDataApi = (initialUrl, initialData) => {
    const { useState, useEffect, useReducer } = React;
    const [url, setUrl] = useState(initialUrl);
  
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });
    console.log(`useDataApi called`);
    
    useEffect(() => {
      console.log("useEffect Called");
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: "FETCH_INIT" });
        try {
          const result = await axios(url);
          console.log("FETCH FROM URl");
          if (!didCancel) {
            dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: "FETCH_FAILURE" });
          }
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }, [url]);
  
    return [state, setUrl];
  };
  
  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };
  
  const Products = (props) => {
    const [items, setItems] = React.useState(products);
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    // const {
    //   Card,
    //   Accordion,
    //   Button,
    //   Container,
    //   Row,
    //   Col,
    //   Image,
    //   Input,
    // } = ReactBootstrap;
    
    //  Fetch Data
    const { Fragment, useState, useEffect, useReducer } = React;
    // const [query, setQuery] = useState("http://localhost:1337/products");
    const [query, setQuery] = useState("products");
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
      "http://localhost:1337/products",
      {
        data: [],
      }
    );
  
    console.log(`Rendering Products ${JSON.stringify(data)}`);

    //=========Cart=============
    const Cart = (props) => {
      // const { Card, Accordion, Button } = ReactBootstrap;
      let data = props.location.data ? props.location.data : products;
      console.log(`data:${JSON.stringify(data)}`);

      return <Accordion defaultActiveKey="0">{list}</Accordion>;
    };

    
    // repeated from "cartFunctions"
    // how to use this from a library somewhere else?
    const containsItemName = (anArrayOfItems, aName) => {
      for (let i = 0; i < anArrayOfItems.length; i++) {
          const element = anArrayOfItems[i];
          if (element.name !== undefined) {
              if (element.name === aName) {
              return true;
              //break;
              }
          }
      }
      return false;
  }    

    
    // Fetch Data
    const addToCart = (e) => {
      let name = e.target.name;
      let newCart = cart;
      // adding to cart originally was not removing from stock
      // and cart would fill even if stock was zero !!
     // let itemsClicked = items.filter((item) => item.name == name);
      // added a control of stock
      // ATTENTION: itemsClicked is an array, eventhough it should always be of lenght 1
      
      let newStock = items.map( item => {
          if (item.name === name) {
            if (item.instock > 0) {
                item.instock--;
                console.log(`add to Cart ${JSON.stringify(item)}`);
                newCart = [...newCart, item];
              } else {
                alert(`${item.name} is out of stock!`);
              }
           };
           
           return item;
      });
      
      setCart([...newCart]);
      setItems([...newStock]);
  
      //doFetch(query);
    };
    
    const returnProductsToStock = (returnedItems) => {
      // ATTENTION: returnedItem is an array, eventhough it should always be of lenght 1
      items.map((item) => {
          returnedItems.forEach(retItem => {
            if (item.name === retItem.name) {
              item.instock++;
             }
          });   
      });
    };
  
    const deleteCartItem = (index) => {
      // restocking product
      let returnedItem = cart.filter((item, i) => index === i);
      returnProductsToStock(returnedItem);
  
      // delete is ok
      let newCart = cart.filter((item, i) => index != i);
      setCart(newCart);
    };
    
    // photos in local storage:
    const photos = ["apple.png", "orange.png", "beans.png", "cabbage.png"];
  
    let list = items.map((item, index) => {
      let n = index + 1000; // 1049; // this "n" will make images fix
      let url = `https://picsum.photos/id/${n}/50/50`;
  
      //<Image src={photos[index % 4]} width={70} roundedCircle></Image>
      return (
        <li key={index}>
          <Image src={url} width={70} roundedCircle></Image>
          <Button variant="primary" size="large">
            {item.name}:${item.cost}:{item.instock}
          </Button>
          <input name={item.name} type="submit" onClick={addToCart}></input>
        </li>
      );
    });
    
    // Accordion.Toggle not working. Removed for testing and ERROR disapeared
    // after "bootstrap css" was imported, the Accordion "link" in now on but the "remove" button is not visible anymore
    // so I removed .Collapse and it showed up permanently
    let cartList = cart.map((item, index) => {
      return (
        <Card key={index}>
          <Card.Header>
            <Accordion as={Button} variant="link" eventKey={1 + index}>
              {item.name}
            </Accordion>
          </Card.Header>
          <Accordion eventKey={1 + index}>
            <Card.Body className="cart-body">
              $ {item.cost} from {item.country} <Button className="cart-removeItem" onClick={() => deleteCartItem(index)}>Remove Item</Button>
            </Card.Body>
          </Accordion>
        </Card>
      );
    });
  
    let finalList = () => {
      let total = checkOut();
      let final = cart.map((item, index) => {
        return (
          <div key={index} index={index}>
            {item.name}
          </div>
        );
      });
      return { final, total };
    };
  
    const checkOut = () => {
      // checkout sum is working properly
      let costs = cart.map((item) => item.cost);
      const reducer = (accum, current) => accum + current;
      let newTotal = costs.reduce(reducer, 0);
      console.log(`total updated to ${newTotal}`);
      return newTotal;
    };
    
     const restockProducts = (url) => {
      doFetch(url);
  
      // original, would simply add new items to list
      // let newItems = data.map( (item) => {
      //   // we simply destructure the data into variables we want
      //   let { name, country, cost, instock } = item;
      //   return { name, country, cost, instock };
      // } );
  
      let updatedItems = items;
      
      // external loop is on current product list (items)
      for (let index = 0; index < updatedItems.length; index++) {
        const element = updatedItems[index];
        
        // internal loop through restock data      
        data.forEach(item => {
          let { name, country, cost, instock } = item;
          
          if (element.name === name) {
            element.instock += instock;
            // we can "update" cost (for now "cost" is "price")
            element.cost = cost;
            // country too?
            element.country = country;
  
            return { name, country, cost, instock }
          }
        });
      }
  
      // now we check for actual new items (products that were not in the original list)
      let newItems = data.filter( (item) => {
        let { name, country, cost, instock } = item;
  
        if (!containsItemName(updatedItems, name)) {
          return { name, country, cost, instock };
        } else 
          return;
      });
  
      setItems([...updatedItems, ...newItems]);
  
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <h1>Product List</h1>
            <ul style={{ listStyleType: "none" }}>{list}</ul>
          </Col>
          <Col>
            <h1>Cart Contents</h1>
            <Accordion>{cartList}</Accordion>
          </Col>
          <Col>
            <h1>CheckOut </h1>
            <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
            <div> {finalList().total > 0 && finalList().final} </div>
          </Col>
        </Row>
        <Row>
          <form
            onSubmit={(event) => {
              restockProducts(`http://localhost:1337/${query}`);
              console.log(`Restock called on ${query}`);
              event.preventDefault();
            }}
          >
            <input
              className="ReStockURL"
              type="text"
              value={`http://localhost:1337/${query}`}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">ReStock Products</button>
          </form>
        </Row>
      </Container>
    );
  };
  
  export default Products;