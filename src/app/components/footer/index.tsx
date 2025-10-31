import React, { useEffect, useRef } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* === STYLED COMPONENTS === */
const FooterWrapper = styled.footer`
  width: 100%;
  background: #fff9f6;
  color: #4b3b2a;
  padding: 80px 0 40px 0;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(60px);
  transition: all 1s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #f7c59f, #ffd6d4, #a3d8f4);
  }
`;

const FooterLink = styled(Link)`
  color: #6c5a4b;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;

  &:hover {
    color: #d19b7f;
    transform: translateX(4px);
  }
`;

const SocialButton = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(241, 203, 180, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(241, 203, 180, 0.45);
    transform: scale(1.15);
  }

  img {
    width: 18px;
    opacity: 0.8;
  }
`;

/* === FOOTER COMPONENT === */
export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <FooterWrapper ref={footerRef}>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={6}
        >
          {/* BRAND SECTION */}
          <Stack spacing={2} sx={{ maxWidth: "340px" }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <img src="/icons/icon1.jpeg" width="60" alt="logo" />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  color: "#b8825b",
                  letterSpacing: "1px",
                }}
              >
                Cosmetics Global
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "15px",
                lineHeight: "26px",
                color: "#5f4d3e",
                opacity: 0.9,
              }}
            >
              Nurturing beauty through science and care. Discover elegance,
              confidence, and timeless radiance in every product we create.
            </Typography>

            <Stack direction="row" spacing={1.5} mt={2}>
              <SocialButton href="#">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </SocialButton>
              <SocialButton href="#">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </SocialButton>
              <SocialButton href="#">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </SocialButton>
              <SocialButton href="#">
                <img src="/icons/youtube.svg" alt="YouTube" />
              </SocialButton>
            </Stack>
          </Stack>

          {/* QUICK LINKS */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#3b2f26",
                marginBottom: "4px",
              }}
            >
              Quick Links
            </Typography>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/products">Products</FooterLink>
            <FooterLink to="/help">Help</FooterLink>
          </Stack>

          {/* CONTACT INFO */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#3b2f26",
                marginBottom: "4px",
              }}
            >
              Contact Us
            </Typography>

            <Typography sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#b8825b" }}>L.</span> Downtown, SEOUL
            </Typography>
            <Typography sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#b8825b" }}>P.</span> +82 10 2897 7980
            </Typography>
            <Typography sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#b8825b" }}>E.</span> contact@cosmetics.com
            </Typography>
            <Typography sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#b8825b" }}>H.</span> 24/7 Support
            </Typography>
          </Stack>
        </Stack>

        {/* DIVIDER */}
        <Box
          sx={{
            borderTop: "1px solid rgba(0,0,0,0.1)",
            marginTop: "60px",
            marginBottom: "20px",
          }}
        ></Box>

        {/* COPYRIGHT */}
        <Typography
          align="center"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            color: "#7a6a5b",
            opacity: 0.9,
          }}
        >
          © 2025 Cosmetics Global. All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
}

