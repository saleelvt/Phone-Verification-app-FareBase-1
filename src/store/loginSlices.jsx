import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumberAfterVerification:null,
  userFunction:null,
  otp:null,
  email:''
};

const userSlice = createSlice({
  name: "phoneVerification",
  initialState,
  reducers: {
    login: (state, action) => {
        state.phoneNumber=action.payload
    },
    confirFunction:(state,action)=>{
        state.userFunction=action.payload
    },
    storePhoneNumber:(state,action)=>{
       state.phoneNumberAfterVerification=action.payload
    }
  },
});

export default userSlice.reducer
export const  {login,confirFunction,storePhoneNumber} =userSlice.actions
