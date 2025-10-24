import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularProducts";
import NewDishes from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"; //dispatch = the magic Redux function that sends your action to reducers.
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

/** REDUX SLICE **/
const actionDispatch = (dispatch: Dispatch) => ({
  //obyekt return bolyapti
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
  // Backend server data fetch => Data
  const product = new ProductService();

  // ✅ POPULAR PRODUCTS
  product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
    })
    .then((data) => {
      console.log("🔥 Popular products raw data:", data); // backenddan kelgan obyekt
      data.forEach((product: any, index: number) => {
        console.log(`🔹 Popular product ${index} images:`, product.productImages);
      });
      setPopularProducts(data); // Redux store’ga saqlanadi
    })
    .catch((err) => console.log(err));

  // ✅ NEW PRODUCTS
  product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
    })
    .then((data) => {
      console.log("🆕 New products raw data:", data); // backenddan kelgan obyekt
      data.forEach((product: any, index: number) => {
        console.log(`🔹 New product ${index} images:`, product.productImages);
      });
      setNewProducts(data);
    })
    .catch((err) => console.log(err));

  // ✅ TOP USERS
  const memberService = new MemberService();

  memberService
    .getTopUsers()
    .then((data) => {
      console.log("👤 Top users data:", data); // top users
      setTopUsers(data);
    })
    .catch((err) => console.log(err));
}, []);


  return (
    <div className={"homepage"}>
      <PopularDishes />
      <NewDishes />
      <ActiveUsers />
      <Advertisement />
      <Statistics />
      <Events />
    </div>
  );
}
