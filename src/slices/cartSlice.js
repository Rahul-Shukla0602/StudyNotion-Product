import { createSlice } from "@reduxjs/toolkit";
import { toast  } from "react-hot-toast";
const initalState = {
   totalItems:localStorage.getItem('totalItems')?JSON.parse(localStorage.getItem('totalItems')):0,
   cart:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cart')):[],
   total:localStorage.getItem('total')?JSON.parse(localStorage.getItem('total')):0,
}

const cartslice = createSlice({
    name:'cart',
    initialState: initalState,
    reducers:{
        //add to  cart 
        addToCart(state,actions){
            const course = actions.payload;
            const index = state.cart.findIndex((item)=>item._id===course._id);
            if(index>=0){
                toast.error("Course already in cart")
                return
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(course);
            // Update the total quantity and price
            state.totalItems++;
            state.total += course.price
            // Update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
        },
         //remove to cart
        removeCart(state,actions){
            const courseID = actions.payload;
            const index = state.cartItems.findIndex((item)=>item._id===courseID);
            if(index>=0){
                //If the course is found in the cart, remove it
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index,1);
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        //resetCart
        resetCart(state){
            state.totalItems = 0
            state.total = 0
            state.cart = []
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    }
});

export const {addToCart, removeFromCart, resetCart} = cartslice.actions;
export default cartslice.reducer;