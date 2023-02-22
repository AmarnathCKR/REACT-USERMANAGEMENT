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

const adminSlice = createSlice({
    name : "admin-token",
    initialState : "",
    reducers : {
        
        subscribeAdminToken : (state, actions) => {
            return state = actions.payload
        },
        unsuscribeAdminToken : (state, actions) => {
            return state = ''
        },
    }
})

const allDataSlice = createSlice({
    name : "allData",
    initialState : "",
    reducers : {
        
        subscribeAllData : (state, actions) => {
            return state = actions.payload
        },
        unsuscribeAllData : (state, actions) => {
            return state = ''
        },
    }
})



const store = configureStore({
    reducer : {
        token : tokenSlice.reducer,
        email : emailSlice.reducer,
        user : userSlice.reducer,
        adminToken : adminSlice.reducer,
        allData : allDataSlice.reducer,
    }

})



export default store

export const {subscribeToken, unsuscribeToken} = tokenSlice.actions
export const {subscribeEmail, unsuscribeEmail} = emailSlice.actions
export const {subscribeUser, unsuscribeUser} = userSlice.actions
export const {subscribeAdminToken, unsuscribeAdminToken} =adminSlice.actions
export const {subscribeAllData, unsuscribeAllData} = allDataSlice.actions

