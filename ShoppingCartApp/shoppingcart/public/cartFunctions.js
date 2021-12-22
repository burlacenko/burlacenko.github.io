// some ES6 Warm Up from w12
// and more

const getCostOf = id => { 
    foundCost = {found: false, price: 0};

    for (let i = 0; i < data.fruits.length; i++) {
        const afruit = data.fruits[i];
        if (afruit.id === id) {
            if (typeof afruit.price === 'number') {
            foundCost.found = true;
            foundCost.price = afruit.price;
            break;
            }
        }
    }
    return foundCost;
}

const getTotal = cart => {
    let total = 0;
    cart.forEach(id => {
        aCost = getCostOf(id);
        if (aCost.found){
            total += aCost.price;
        };
    });
    return total;
}

const getCostOf_simplified = id => {
    result = (data.fruits.filter(item => item.id == id))[0].price;
    return result;
};

const getTotal_simplified = cart => {
    let total = 0;
    cart.map(item => (total += getCostOf_simplified(item)));
    return total;
}

// write a function to fill the shopping cart with random fruits
// up to my limit of 1000 [we defined a var cartLimit = 1000 at the beginning]
// write out the actual cost of the food in the cart eg 980
// hint use Math.random() to get a number between 0 and 1 then scale it to some integer
// scale is the range of the array (array length) so that it does not get out of bounds
const getRandom = scale => Math.floor(Math.random() * scale);

const getRandomIndexOfAnArray = (array) => {
    // scale is the range of the array (array length) so that it does not get out of bounds
    return Math.floor((Math.random() * array.length));
}

const getFruitsTotal = (arrayOfFruits) => {
    let total = 0;
    arrayOfFruits.forEach(afruit => {
            if (afruit.price > 0){
                total += afruit.price;
            };
        });
    return total;
}

const getFruitsTotal_simplified = (arrayOfFruits) => {
    let total = 0;
    arrayOfFruits.map(item => getConstOf_simplified(item.id))
    return total;        
}

const fillCart = (aCart = [], anArrayOfFruits =[]) => {
    // aCart is like cart (indexes only !)
    // anArrayOfFruits is like data.fruits (array of fruit objects !)
    let dataTotalPrices = 0;
    let totalOfCart = 0;
    let filled = false;

    // we will first make some validation to check if there is enough valid data to proceed
    if (anArrayOfFruits.length > 0) {
        
        dataTotalPrices = getFruitsTotal(anArrayOfFruits);
        // dataTotalPrices = getFruitsTotal_simplified(anArrayOfFruits);

        if (dataTotalPrices>0) {
            while (!filled) {
                aIndex = getRandomIndexOfAnArray(anArrayOfFruits);
                if ( (totalOfCart + anArrayOfFruits[aIndex].price) > cartLimit) {
                    filled = true;
                } else {
                    cartOfFruits.push(anArrayOfFruits[aIndex]);
                    aCart.push(aIndex);
                    totalOfCart += anArrayOfFruits[aIndex].price;
                }
            }
        }
    }
    return totalOfCart;
}

const fillCart_simplified = (cart = []) => {
    // it is a version given by professor Williams, but this solution is NOT integrated to the rest of the code I wrote
    total = 0;
    while (true) {
        nextItem = getRandom(data.fruits.length);
        if ( total + getCostOf_simplified(nextItem) < cartLimit ) {
            cart.push(nextItem);
            total += getCostOf_simplified(nextItem);
        } else return total;
    }
}

const listNamesOfFruits = (aFruitCart = []) => {
    // aFruitCart is like cartOfFruits
    let names = [];
    aFruitCart.forEach(aFruit => {
        names.push(aFruit.name);
    });
    return names;
}

const listNamesFromGroupedCart = (aGroupedCart = []) => {
    // aGroupedCart is like cartOfFruitsGrouped
    let names = [];
    aGroupedCart.forEach(aGroup => {
        names.push(`${aGroup.quantity}x ${aGroup.aFruit.name} each for $${Number(aGroup.sum / aGroup.quantity).toFixed(2)} on total of $${aGroup.sum}`);
    });
    return names;
}

const containsFruitId = (anID) => {
    for (let i = 0; i < cartOfFruitsGrouped.length; i++) {
        const element = cartOfFruitsGrouped[i];
        if (element.aFruit.id !== undefined) {
            if (element.aFruit.id === anID) {
            return true;
            break;
            }
        }
    }
    return false;
}

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

const getQty = (anArrayOfItems, aName) => {
    for (let i = 0; i < anArrayOfItems.length; i++) {
        const element = anArrayOfItems[i];
        if (element.name !== undefined) {
            if (element.name === aName) {
            return element.incart;
            //break;
            }
        }
    }
    return undefined;
}

const pushGroupedFruit = (aFruitItem) => {
    // this method evolved from containsFruitId + addRepeatedFruit
    // is is "all in one"
    // it is like a "push" that first will check if Fruit is in the basket
    // if it is in the basket, it only adds quantity and sum prices
    // if it is NOT in the basket, it pushed a new fruit
        
    // if (cartOfFruitsGrouped.length > 0) {
        for (let i = 0; i < cartOfFruitsGrouped.length; i++) {
            if (cartOfFruitsGrouped[i].aFruit.id === aFruitItem.id) {
                cartOfFruitsGrouped[i].quantity++;
                cartOfFruitsGrouped[i].sum += aFruitItem.price;
                return; // exit because we found and updated fruit totals
            };
        }
    // }

    // if did NOT break, we also need to push new
    cartOfFruitsGrouped.push({'aFruit': aFruitItem, 'quantity': 1, 'sum': aFruitItem.price});
}    

const addRepeatedFruit = (aRepeatedFruitItem) => {
    for (let i = 0; i < cartOfFruitsGrouped.length; i++) {
        if (cartOfFruitsGrouped[i].aFruit.id === aRepeatedFruitItem.id) {
            cartOfFruitsGrouped[i].quantity++;
            cartOfFruitsGrouped[i].sum += aRepeatedFruitItem.price;
            break;
        }
    }
}

const compactListOfFruit = (aFruitCart = []) => {
    // aFruitCart is like cartOfFruits
    // this method will group same fruits
    
    // reset public var (of result):
    // cartOfFruitsGrouped = [{aFruit: {}, quantity: Number, sum: Number}];
    cartOfFruitsGrouped = [];

    aFruitCart.forEach((itemOnCart) => {
        
        // old, less efficient:
        // if (containsFruitId(itemOnCart.id)) {
        //     addRepeatedFruit(itemOnCart);
        // } else {
        //     cartOfFruitsGrouped.push({'aFruit': itemOnCart, 'quantity': 1, 'sum': itemOnCart.price});
        // }

        // this is to be more efficient:
        pushGroupedFruit(itemOnCart);
    });
}

var list = items.map((item, index) => {
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