import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialCartState = {
    showCart: false,
    notification: null
}

const initialCartItems = {
    cartItem: {},
    cartItemArray: [],
    totalAmount: 0,
    sendDataToserver: false
}

const toggleCartSlice = createSlice({
    name: 'toggleCart',
    initialState: initialCartState,
    reducers: {
        toggle(state) { state.showCart = !state.showCart },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: initialCartItems,
    reducers: {
        AddToCartItems(state, action) {
            state.cartItem = action.payload
            const indexOfExistingItem = state.cartItemArray.findIndex((item) => item.title === state.cartItem.title)
            if (indexOfExistingItem >= 0) {
                state.cartItemArray[indexOfExistingItem] = state.cartItem
            } else if (indexOfExistingItem < 0) {
                state.cartItemArray.push(state.cartItem)
            }
            state.cartItemArray = state.cartItemArray.filter(item => item.amount > 0)
            state.totalAmount = state.cartItemArray
                .reduce((preVal, currentVal) => preVal + (currentVal.amount * currentVal.price), 0);

            if (action.payload.addToCartClicked)
                state.sendDataToserver = true;
        },
        fetchedCartItems(state, action) {
            if (action.payload !== null) {
                console.log(action.payload)
                state.cartItemArray = [...action.payload]
                state.totalAmount = state.cartItemArray
                    .reduce((preVal, currentVal) => preVal + (currentVal.amount * currentVal.price), 0)
            } else {
                console.log('fetched Cart is Empty')
                return;
            }
        },
        IncItemAmount(state, action) {
            const index = state.cartItemArray.findIndex((item) => item.title === action.payload.title && item.amount >= 0 && item.amount < 10)
            if (index >= 0) {
                ++state.cartItemArray[index].amount;
                state.totalAmount = state.cartItemArray
                    .reduce((preVal, currentVal) => preVal + (currentVal.amount * currentVal.price), 0)
                state.cartItemArray = state.cartItemArray.filter(item => item.amount > 0)
                state.sendDataToserver = true;
            }
        },
        DecItemAmount(state, action) {
            const index = state.cartItemArray.findIndex((item) => item.title === action.payload.title && item.amount > 0)
            if (index >= 0) {
                --state.cartItemArray[index].amount;
                state.totalAmount = state.cartItemArray
                    .reduce((preVal, currentVal) => preVal + (currentVal.amount * currentVal.price), 0)
                state.cartItemArray = state.cartItemArray.filter(item => item.amount > 0)
                state.sendDataToserver = true;
            }
        }
    }
})

const store = configureStore({
    reducer: {
        cartState: toggleCartSlice.reducer,
        cartItems: cartItemsSlice.reducer
    }
})

export default store;
export const toggleCartActions = toggleCartSlice.actions;
export const cartItemsActions = cartItemsSlice.actions;
