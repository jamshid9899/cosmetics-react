import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  background: #2b2b2b;
  display: flex;
  padding-top: 80px;
  padding-bottom: 40px;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="column" style={{ width: "340px" }}>
            <Box>
              <img width="100px" src="/icons/icon1.jpeg" alt="Logo" />
            </Box>
            <Box className="foot-desc-txt">
              Premium skincare and cosmetics designed to enhance your natural
              beauty. Experience elegance and care in every product.
            </Box>
            <Box className="sns-context">
              <img src="/icons/facebook.svg" alt="Facebook" />
              <img src="/icons/twitter.svg" alt="Twitter" />
              <img src="/icons/instagram.svg" alt="Instagram" />
              <img src="/icons/youtube.svg" alt="YouTube" />
            </Box>
          </Stack>

          <Stack flexDirection="row" spacing={10}>
            <Stack>
              <Box className="foot-category-title">Quick Links</Box>
              <Box className="foot-category-link">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {authMember && <Link to="/orders">Orders</Link>}
                <Link to="/help">Help</Link>
              </Box>
            </Stack>

            <Stack>
              <Box className="foot-category-title">Contact Us</Box>
              <Box className="foot-category-link">
                <Box className="find-us">
                  <span>L.</span>
                  <div>Downtown, SEOUL</div>
                </Box>
                <Box className="find-us">
                  <span>P.</span>
                  <div>+821028977980</div>
                </Box>
                <Box className="find-us">
                  <span>E.</span>
                  <div>contact@cosmetics.com</div>
                </Box>
                <Box className="find-us">
                  <span>H.</span>
                  <div>24/7 Support</div>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Box className="footer-divider" />

        <Stack className="copyright-txt" alignItems="center">
          © 2025 Cosmetics Global. All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
