import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage; //homePage ga dahldor bo'lgan storage ni qolga kiritmoqdamiz

export const retrievePopularProducts = createSelector(
  selectHomePage, //homePage slice ichiga qaramoqdamiz
  (HomePage) => {
    // memoization (eslab qolish => memorize ya'ni)
    return HomePage.popularProducts;
  } // va undan popularDishes ni return qilmoqdamiz
);

export const retrieveNewProducts = createSelector(
  (state: AppRootState) => state.homePage, // state.homepage ni qolga olmoqda
  (HomePage: HomePageState) => HomePage.newProducts // homePage eslab qolyaptida va uni ichidan newDishes qolga olmoqda
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage: HomePageState) => HomePage.topUsers
);
