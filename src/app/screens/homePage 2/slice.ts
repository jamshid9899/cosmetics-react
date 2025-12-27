import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularProducts: [],
  newProducts: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage", // reduxda state.homePage nomi bn saqlanadi
  initialState, // boshlangich nuqtasi ya'ni state boshida bo'sh array korinishida boladi (tepadagi misol)
  reducers: {
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload; //takes the current state and replaces popularDishes (value) with whatever is in action.payload
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularProducts, setNewProducts, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
