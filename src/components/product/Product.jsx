import React, { useReducer} from 'react';
import './product.css';
import products from '../../productData';
import { act } from 'react-dom/test-utils';

function getTotal(cart) {
    const totalAmount = cart.reduce((totalCost, item) => totalCost + item.price, 0);
    return totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})

}

function cartReducer(state,action) {
  switch (action.type) {
    case 'add':
      return [...state, action.product]
      
    case 'remove':
      const productIndex = state.findIndex(item => item.name === action.product.name);
      if(productIndex < 0) {
        return state;
      }
      const update = [...state];
      update.splice(productIndex, 1)
      return update
  
    default:
      return state
  }
}



const Product = () => {
  const [cart,setCart] = useReducer(cartReducer,[])

  function addItem(product) {  
    setCart({product, type: 'add'}); 
  }

  // useState
  // const addItem = (product) => {
  //     setCart(currentState => [...currentState, product.name]);
  //     setTotalAmount(currentState => currentState + product.price);
  
  // }

  const removeItem = (product) => {
    setCart({product, type: 'remove'});
  }
  return (
    // <div className="wrapper">
    //   <div>Shopping Cart : {cart.length} {cart}</div>
    //   <div>Total: {getTotal(total)} </div>
    //   <div className="product">
    //     <span role="img" aria-label="ice cream">🍦</span>
    //   </div>
    //   <button onClick={addItem}>Add</button>
    //   <button onClick={removeItem}>Remove</button>
    // </div>

    <div className="wrapper">
      <div>Shopping Cart : {cart.length} total items</div>
      <div>Amount: {getTotal(cart)} </div>
      {products.map((product)=>{
        return(
          <div key= {product.name}>
            <div className="product">
              <p>{product.name.toLocaleUpperCase()}</p>
              <span role="img" aria-label="ice cream">{product.emoji}</span>
              <p>{product.price}</p>
            </div>
            <button onClick={()=>addItem(product)}>Add</button>
            <button onClick={()=>removeItem(product)}>Remove</button>
          </div>
        )
      })}
    </div>
  )
}

export default Product;
