import { createSelector } from "reselect";
import { AppRootState, OrdersPageState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.pausedOrders
);

export const retrieveProccessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.finishedOrders
);
