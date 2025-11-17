// PopularProducts.tsx
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  console.log("popularProducts:", popularProducts);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">✨ Popular Products</Box>
          <Box className="category-subtitle">
            Most loved skincare essentials by our customers
          </Box>
          
          <Stack className="cards-frame">
            {popularProducts.length !== 0 ? (
              popularProducts.map((product: Product, index: number) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card 
                      className="card" 
                      sx={{ 
                        position: "relative",
                        '--card-index': index 
                      }}
                    >
                      {/* Popularity Badge */}
                      <Box className="popularity-badge">
                        <FavoriteIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        Popular
                      </Box>

                      {/* Product Image */}
                      <Box
                        component="img"
                        src={imagePath}
                        alt={product.productName}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 1,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 0,
                          transition: "transform 0.5s ease",
                        }}
                        className="product-image"
                      />
                      
                      {/* Gradient overlay */}
                      <CardCover
                        className="card-cover"
                        sx={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%), linear-gradient(to top, rgba(184,138,68,0.3) 0%, rgba(0,0,0,0) 60%)",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          zIndex: 1,
                        }}
                      />
                      
                      <CardContent sx={{ justifyContent: "flex-end", zIndex: 2, position: "relative" }}>
                        <Stack spacing={1.5}>
                          <Typography 
                            level="h2" 
                            fontSize="22px" 
                            textColor="#fff" 
                            fontWeight="700"
                            fontFamily="'Poppins', sans-serif"
                            sx={{
                              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                            }}
                          >
                            {product.productName}
                          </Typography>
                          
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography
                              fontSize="20px"
                              fontWeight="700"
                              sx={{
                                color: "#f5d28b",
                                textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                                fontFamily: "'Playfair Display', serif",
                              }}
                            >
                              ${product.productPrice}
                            </Typography>
                            
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Typography
                                sx={{
                                  fontWeight: "600",
                                  color: "#fff",
                                  fontSize: "15px",
                                  fontFamily: "'Poppins', sans-serif",
                                }}
                              >
                                {product.productViews}
                              </Typography>
                              <VisibilityIcon sx={{ fontSize: 20, color: "#f5d28b" }} />
                            </Stack>
                          </Stack>

                          <Typography
                            fontSize="14px"
                            textColor="rgba(255,255,255,0.85)"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              lineHeight: 1.6,
                              fontFamily: "'Poppins', sans-serif",
                            }}
                          >
                            {product.productDesc}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular Products are not available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}