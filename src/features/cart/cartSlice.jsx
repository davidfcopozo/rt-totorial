import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', ()=>{
  return fetch(url).then(res =>res.json()).catch(err => console.log(err))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Whatever we return in the actions will replace the initial state, that means that all properties there will also be removed
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      //console.log(action);
      const itemId = action.payload
      state.cartItems = state.cartItems.filter(item => item.id !== itemId)
    },
    //Here we destructured the payload, insatead of getting it as prop from the action object
    increase: (state, {payload})=>{
      const cartItem = state.cartItems.find((item)=> item.id === payload.id)
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, {payload})=>{
      const cartItem = state.cartItems.find((item)=> item.id === payload.id)
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state)=>{
      let amount = 0,
       total=0;
      state.cartItems.forEach((item)=>{
        amount += item.amount;
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state)=>{
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action)=>{
      console.log(action);
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state)=>{
      state.isLoading = false
    },
  }
})

//console.log(cartSlice);

//Actions
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions

//Reducers
export default cartSlice.reducer