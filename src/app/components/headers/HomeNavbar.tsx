import React from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      {/* ------------------- Navbar ------------------- */}
      <Container className="navbar-container">
        <Stack direction="row" justifyContent="space-between" alignItems="center" className="menu">
          {/* Logo */}
          <NavLink to="/">
            <img
              className="brand-logo"
              src="/img/default.jpeg" // cosmetics logosi
              alt="Brand Logo"
            />
          </NavLink>

          {/* Links + Basket + User */}
          <Stack direction="row" spacing={4} alignItems="center" className="links">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/products" className="nav-link">Products</NavLink>

            {authMember && (
              <>
                <NavLink to="/orders" className="nav-link">Orders</NavLink>
                <NavLink to="/member-page" className="nav-link">My Page</NavLink>
              </>
            )}

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
            ) : (
              <img
                alt=""
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                onClick={handleLogoutClick}
              />
            )}

            {/* Logout Menu */}
            <Menu
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        {/* ------------------- Banner Text ------------------- */}
        <Stack className="banner-text" spacing={2} mt={5} alignItems="center">
          <Box className="head-main-txt">Cosmetics & Skincare</Box>
          <Box className="wel-txt">Premium Products for Your Beauty</Box>
          <Box className="service-txt">24 Hours Service</Box>
          {!authMember && (
            <Button
              className="signup-button"
              variant="contained"
              onClick={() => setSignupOpen(true)}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Container>
    </div>
  );
}







