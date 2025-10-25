import { createSelector } from "reselect";
import { AppRootState, ProductsPageState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveAdmin = createSelector(
  (state: AppRootState) => state.productsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.admin
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  (state: AppRootState) => state.productsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.products
);
