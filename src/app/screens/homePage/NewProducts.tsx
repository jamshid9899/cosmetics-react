import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FiberNewIcon from "@mui/icons-material/FiberNew";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const newProductsRetriever = createSelector(retrieveNewProducts, (newProducts) => ({
  newProducts,
}));

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);
  console.log("newProducts:", newProducts);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>🌟 New Arrivals</Box>
          <Box className="category-subtitle">
            Fresh additions to elevate your skincare routine
          </Box>
          
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newProducts.length !== 0 ? (
                newProducts.map((product: Product, index: number) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                      sx={{ '--card-index': index }}
                    >
                      <CardOverflow sx={{ position: 'relative' }}>
                        {/* New Badge */}
                        <div className="product-new-badge">
                          <FiberNewIcon sx={{ fontSize: 18, mr: 0.5 }} />
                          NEW
                        </div>
                        
                        <AspectRatio ratio="1">
                          <img 
                            src={imagePath} 
                            alt={product.productName}
                            style={{
                              transition: 'transform 0.5s ease',
                            }}
                            className="new-product-image"
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className={"product-detail"}>
                        <Stack className="info">
                          <Stack spacing={1} sx={{ width: '100%' }}>
                            <Typography 
                              className={"title"}
                              sx={{
                                fontSize: '17px',
                                fontWeight: 600,
                                color: '#2c2c2c',
                                fontFamily: "'Poppins', sans-serif",
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {product.productName}
                            </Typography>
                            
                            <Stack 
                              direction="row" 
                              justifyContent="space-between" 
                              alignItems="center"
                              sx={{ width: '100%' }}
                            >
                              <Typography 
                                className={"price"}
                                sx={{
                                  fontSize: '20px',
                                  fontWeight: 700,
                                  color: '#b88a44',
                                  fontFamily: "'Playfair Display', serif",
                                }}
                              >
                                ${product.productPrice}
                              </Typography>
                              
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <Typography 
                                  className={"views"}
                                  sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#666',
                                    fontFamily: "'Poppins', sans-serif",
                                  }}
                                >
                                  {product.productViews}
                                </Typography>
                                <VisibilityIcon
                                  sx={{ fontSize: 18, color: '#b88a44' }}
                                />
                              </Stack>
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>New Products are not available</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}