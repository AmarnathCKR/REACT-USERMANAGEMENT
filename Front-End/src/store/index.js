import { configureStore,createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name : "JWT AUTH",
    initialState : "",
    reducers : {
        
        subscribeToken : (state, actions) => {
            return state = actions.payload
        },
        unsuscribeToken : (state, actions) => {
            return state = ''
        },
    }
})

const emailSlice = createSlice({
    name : "email",
    initialState : "",
    reducers : {
        
        subscribeEmail : (state, actions) => {
            return state = actions.payload
        },
        unsuscribeEmail : (state, actions) => {
            return state = ''
        },
    }
})

const userSlice = createSlice({
    name : "user",
    initialState : "",
    reducers : {
        
        subscribeUser : (state, actions) => {
            return state = actions.payload
        },
        unsuscribeUser : (state, actions) => {
            return state = ''
        },
    }
})


const store = configureStore({
    reducer : {
        token : tokenSlice.reducer,
        email : emailSlice.reducer,
        user : userSlice.reducer
    }
})


export default store

export const {subscribeToken, unsuscribeToken} = tokenSlice.actions
export const {subscribeEmail, unsuscribeEmail} = emailSlice.actions
export const {subscribeUser, unsuscribeUser} = userSlice.actions


