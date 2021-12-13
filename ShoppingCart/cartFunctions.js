// ES6 Warm Up from w12
// var cartLimit = 1000;
// var cartOfFruits = []; // for fruits
// var cart = []; // for indexes only
// var cartOfFruitsGrouped = []; // for grouped fruits (same fruits will be summed together)

let data = {
    "fruits": [{
            "id": 1,
            "name": "Apple",
            "description": "An apple is a sweet, edible fruit produced by an apple tree. Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
            "price": 35,
        },
        {
            "id": 2,
            "name": "Banana",
            "description": "A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains, distinguishing them from dessert banana",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg",
            "price": 12
        },
        {
            "id": 3,
            "name": "Grapes",
            "description": "A small bunched fruit used to make wine",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg",
            "weight": 0.1,
            "price": 45
        },
        {
            "id": 4,
            "name": "Pineapple",
            "description": "a large fruit that goes well with ice cream",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg",
            "price": 200
        },
        {
            "id": 5,
            "name": "Tomato",
            "description": "The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.",
            "image": "https://www.kampexport.com/sites/kampexport.com/files/images/legume/image/tomates_256_1.jpg",
            "price": 150
        },
        {
            "id": 6,
            "name": "Cherry",
            "description": "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe. Commercial cherries are obtained from cultivars of several species, such as the sweet Prunus avium and the sour Prunus cerasus.",
            "image": "https://cdn.shopify.com/s/files/1/0610/2881/products/cherries.jpg?v=1446676415",
            "price": 120
        }
    ]
}
// write your own fruit object and fill in all the properties
myfruit = {
    "id": 0,
    "name": "Plum",
    "description": "A plum is a purple fruit.",
    "image": "https://cdn.shopify.com/s/files/1/0610/2881/products/cherries.jpg?v=1446676415",
    "price": 220
}
// Add your fruit to array of fruits and make it the first one in the array
// old way with splice
// data.fruits.splice(0,0,myfruit);
// using destructing:
data.fruits = [myfruit, ...data.fruits];

// I put fruits (listed by id) into my shopping cart =  [0, 3, 4, 5, 3]
// cart = [0, 3, 4, 5, 3];

// Write a function to calculate how much I will pay at checkout

const getCostOf = id => { 
    // fill in here
    foundCost = {found: false, price: 0};
    // let index = data.fruits.indexOf(fruits.id = id);
    // data.fruits.forEach(afruit => {
    //     afruit.id === id
    // });
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
    // Fill in here
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

// cart = [];
// thisCartTotalValue = fillCart(cart, data.fruits);
// compactListOfFruit(cartOfFruits);

// console.log(`Total value of this cart with ${cart.length} elements is $${thisCartTotalValue}`);
// // console.log('This cart of fruits: ' + listNamesOfFruits(cartOfFruits).toString());
// console.log('This cart of fruits:\r\n' + listNamesOfFruits(cartOfFruits).join('\r\n'));
// console.log(cartOfFruits);
// console.log('Indexes in cart:');
// console.log(cart);
// console.log('Grouped cart:');
// console.log(cartOfFruitsGrouped);
// // console.log('This cart Grouped by fruit:\r\n' + listNamesFromGroupedCart(cartOfFruitsGrouped).join('\r\n'));
// console.log(`This cart Grouped by fruit:\r\n${listNamesFromGroupedCart(cartOfFruitsGrouped).join('\r\n')}`);

// // TO-DO: order fruits by name !
