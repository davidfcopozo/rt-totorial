
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import { calculateTotals, getCartItems } from './features/cart/cartSlice'

function App() {
  const {cartItems, isLoading } = useSelector((store)=> store.cart)
  const { isOpen } = useSelector((store)=> store.modal)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getCartItems());
  }, [])

  useEffect(()=>{
    dispatch(calculateTotals());
  }, [cartItems])

  if(isLoading) {
    return <div className='loading'><h2>Loading...</h2></div>
  }
  return (
  <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
  )}

export default App
