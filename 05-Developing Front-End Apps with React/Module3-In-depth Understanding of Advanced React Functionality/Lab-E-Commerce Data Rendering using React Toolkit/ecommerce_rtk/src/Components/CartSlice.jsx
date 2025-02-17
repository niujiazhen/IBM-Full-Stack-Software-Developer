import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems:[],
};
const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItemToCart(state,action){
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity++;
            }
            else{
                state.cartItems.push({...action.payload,quantity: 1});
            }
        },

        removeItemFromCart(state,action){
            state.cartItems=state.cartItems.filter(item => item.id !== action.payload.id);
        },

        clearCart(state){
            state.cartItems=[];
        },

        increaseItemQuantity(state,action){
            const itemToIncrease = state.cartItems.find(item => item.id === action.payload.id);
            if(itemToIncrease){
                itemToIncrease.quantity++;
            }
        },

        decreaseItemQuantity(state,action){
            const itemToDecrease = state.cartItems.find(item => item.id === action.payload.id);
            if(itemToDecrease && itemToDecrease.quantity > 1){
                itemToDecrease.quantity--;
            }
        }
    }
});

export const{
    addItemToCart,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity
} = CartSlice.actions;
export default CartSlice.reducer;


