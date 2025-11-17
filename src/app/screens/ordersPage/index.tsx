import React, { SyntheticEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Container, Stack } from "@mui/material";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import Divider from "../../components/divider";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProccessOrders, setFinishedOrders } from "./slice";

import "../../../css/order.css";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProccessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderinquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS */
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="order-page">
      <Container className="order-container">
        {/* LEFT SIDE – ORDERS LIST */}
        <Stack className="order-left">
          {/* Title */}
          <Box className="order-header">
            <h2 className="order-title">My Orders</h2>
            <p className="order-subtitle">
              Track your pending, in-process and completed orders in one place.
            </p>
          </Box>

          <TabContext value={value}>
            {/* TABS */}
            <Box className="order-nav-frame">
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  paddingBottom: 2,
                  paddingLeft: 3,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="orders tabs"
                  className={"table_list"}
                >
                  <Tab label="Pending Payment" value={"1"} />
                  <Tab label="In Process" value={"2"} />
                  <Tab label="Completed" value={"3"} />
                </Tabs>
              </Box>
            </Box>

            {/* TAB CONTENT */}
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* RIGHT SIDE – USER CARD + PAYMENT CARD */}
        <Stack className={"order-right"}>
          {/* USER CARD */}
          <Stack className="user-detail">
            <Stack className="user-image">
              <img
                alt=""
                className="user-img"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
              />

              <Box className={"user-name"}>{authMember?.memberNick}</Box>
              <Box className={"user-ident"}>{authMember?.memberType}</Box>
            </Stack>

            <Divider height="1" width="280" bg="black" />

            <Stack className="user-detail-bottom">
              <img
                alt=""
                className="user-location-img"
                src={
                  authMember?.memberType === MemberType.ADMIN
                    ? "/icons/restaurant.svg"
                    : "/icons/user-badge.svg"
                }
              />
              <p className="user-location-p">
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "Do not exist"}
              </p>
            </Stack>
          </Stack>

          {/* PAYMENT CARD */}
          <Box className="order-payment-info-box">
            <div className="payment-card-header">Payment method</div>

            <div className="payment-card-number">
              **** 4090 2002 7495
            </div>

            <div className="payment-card-datas">
              <span className="payment-expire-data">07/24</span>
              <span className="payment-cvv">CVV: 010</span>
            </div>

            <div className="payment-card-user-name">Justin Robertson</div>

            <div className="payment-card-types">
              <img src="/icons/western-card.svg" alt="western" />
              <img src="/icons/master-card.svg" alt="master" />
              <img src="/icons/paypal-card.svg" alt="paypal" />
              <img src="/icons/visa-card.svg" alt="visa" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
