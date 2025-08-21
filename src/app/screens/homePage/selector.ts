import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homepage; //homePage ga dahldor bo'lgan storage ni qolga kiritmoqdamiz

export const retrievePopularDishes = createSelector(
  selectHomePage, //homePage slice ichiga qaramoqdamiz
  (HomePage) => HomePage.popularDishes // va undan popularDishes ni return qilmoqdamiz
);

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
