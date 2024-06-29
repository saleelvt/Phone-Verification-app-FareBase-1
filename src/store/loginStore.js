import { configureStore } from "@reduxjs/toolkit";
import loginSlices from "./loginSlices";


const store=configureStore({
    reducer:{

        LoginDetails:loginSlices
        
    }
})

export default store