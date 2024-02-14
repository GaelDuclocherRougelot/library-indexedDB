import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './book/book';


export const store = configureStore({
    reducer: {
        book: bookReducer,
    }
})