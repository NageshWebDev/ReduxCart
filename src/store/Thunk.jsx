import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleCartActions } from "./redux"

export const sendCartData = createAsyncThunk(
    'send data to realtime database',
    async function sendCartData(cartItem, thunkAPI) {
        try {
            console.log('Sending Cart Data')
            thunkAPI.dispatch(toggleCartActions.showNotification({
                status: 'pending',
                title: 'PENDING ...',
                message: 'Sending Cart Data'
            }))

            const response = await fetch('https://reacthttp-d29f6-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cartItem)
                })

            if (!response.ok)
                throw new Error(response.status);

            thunkAPI.dispatch(toggleCartActions.showNotification({
                status: 'success',
                title: 'SUCCESS',
                message: 'Data sent to sever ...'
            }))
        }
        catch (error) {
            console.log(error.message);
            thunkAPI.dispatch(toggleCartActions.showNotification({
                status: 'error',
                title: 'ERROR !!',
                message: 'Failed to send data ... !!!'
            }))
        }
    }
)

export const fetchCartData = createAsyncThunk(
    'fetch data from realtime database',
    async function fetchCartData(thunkAPI){
        try{
            console.log('Fetching Cart Data')
            const response = await fetch('https://reacthttp-d29f6-default-rtdb.firebaseio.com/cart.json')
            if (!response.ok)
                throw new Error(response.status);

            const jsonData = await response.json()
            console.log(jsonData)
            return jsonData;
        }
        catch(error){
            console.log(error.message);
            thunkAPI.dispatch(toggleCartActions.showNotification({
                status: 'error',
                title: 'ERROR !!',
                message: 'Failed to Fetch ... !!!'
            })) 
        }
    }
    )