// writing the logic to change the quanity and 
// adding to cart

import product from 'ecommerceheadphonesshop/schemas/product';
import React,{ createContext,useState,useEffect,useContext} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty,setQty] = useState(1);


    let foundProduct;
    let index;




    const onAdd = (product, quantity) =>{
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities+ quantity);


        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, 
                    quanity : cartProduct.quanity + quantity 
                }
            })

            setcartItems(updatedCartItems);
            toast.success(`${qty} ${product.name} added to the cart.`);
        }
        else{
            product.quanity = quantity;

            setcartItems([...cartItems,{...product}]);
            toast.success(`${qty} ${product.name} added to the cart.`);
        }
    }


    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id == product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quanity);
        settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quanity);
        setcartItems(newCartItems);

    }

    // cart quantities update

    const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
     
      setcartItems([...newCartItems, { ...foundProduct, quanity: foundProduct.quanity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quanity > 1) {
        setcartItems([...newCartItems, { ...foundProduct, quanity: foundProduct.quanity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

    const incQty = () => {
        setQty((prevQty) => prevQty +1);
    }
    const decQty = () => {

        setQty((prevQty) =>{
            if(prevQty - 1<1) return 1;
            return prevQty -1
        } );
    }



    return(
        <Context.Provider
            value = {{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuanitity,
                onRemove,
                setcartItems,
                setTotalPrice,
                settotalQuantities

                
            }}
        >

            {children}
        </Context.Provider>
    )

};

export const useStateContext = () => useContext(Context);


