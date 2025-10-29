import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";



/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductProps {
  onAdd: (item: CartItem) => void;
}

const brands = [
  { name: "Dior", image: "/img/dior.png" },
  { name: "Nivea", image: "/img/nivea.webp" },
  { name: "The Ordinary", image: "/img/theordinary.webp" },
  { name: "Estée Lauder", image: "/img/estee.webp" },
  { name: "Innisfree", image: "/img/innisfree.webp" },
  { name: "Laneige", image: "/img/laneige.webp" },
];
const tips = [
  {
    title: "Morning Skincare Routine",
    desc: "Start your day fresh with a simple and effective skincare routine that hydrates and protects your skin.",
    image: "/img/tips1.webp",
  },
  {
    title: "Top 5 Hydrating Ingredients",
    desc: "Learn about the most powerful moisturizing ingredients and how they benefit your skin.",
    image: "/img/tips4.webp",
  },
  {
    title: "Night Ritual for Glowing Skin",
    desc: "Discover how to let your skin repair overnight with the best evening skincare practices.",
    image: "/img/tips5.webp",
  },
];


export default function Products({ onAdd }: ProductProps) {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    setProductSearch({ ...productSearch, page: 1, productCollection: collection });
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch({ ...productSearch, page: 1, order });
  };

  const searchProductHandler = () => {
    setProductSearch({ ...productSearch, search: searchText });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch({ ...productSearch, page: value });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection="column" alignItems="center">
          {/* ======= SEARCH HEADER ======= */}
          <Stack className="avatar-big-box">
            <Box className="title">Cosmetics</Box>
            <Box className="search-bar">
              <div className="search-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
                />
                <Button
                  className="search-button"
                  color="primary"
                  variant="contained"
                  onClick={searchProductHandler}
                >
                  <Typography variant="button" sx={{ color: "primary", mr: 1 }}>
                    Search
                  </Typography>
                  <img
                    className="search-icon"
                    src="/icons/search-svgrepo-com.svg"
                    alt=""
                  />
                </Button>
              </div>
            </Box>
          </Stack>

          {/* ======= FILTER BUTTONS ======= */}
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant="contained"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant="contained"
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* ======= CATEGORY SECTION ======= */}
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                {Object.entries(ProductCollection).map(([key, value]) => (
                  <Button
                    key={key}
                    variant="contained"
                    color={
                      productSearch.productCollection === value
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => searchCollectionHandler(value)}
                  >
                    {key.charAt(0) + key.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
            </Stack>

            {/* ======= PRODUCT GRID ======= */}
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <Button
                          className="shop-btn product-actions"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            alt=""
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className="view-btn product-actions" sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-title">{product.productName}</span>
                        <div className="product-price" style={{ color: "#FF9200" }}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available</Box>
              )}
            </Stack>
          </Stack>

          {/* ======= PAGINATION ======= */}
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* ======= BRANDS ======= */}
    <div className="brands-section">
      <h2 className="brands-title">Explore Our Brands</h2>
      <p className="brands-subtitle">
        Discover the world’s most loved skincare and beauty labels
      </p>

      <div className="brands-scroll">
        {brands.length ? (
          brands.map((brand) => (
            <div key={brand.name} className="brand-card">
              <img src={brand.image} alt={brand.name} />
              <p>{brand.name}</p>
            </div>
          ))
        ) : (
          <Box className="no-data">No Brands Available</Box>
        )}
      </div>
    </div>
  );


      {/* ======= Use Routine ======= */}
   <div className="beauty-tips-section">
  <Container>
    <Stack className="beauty-tips-frame">
      <Typography className="beauty-tips-title">
        Discover Skincare Insights
      </Typography>
      <Typography className="beauty-tips-subtitle">
        Explore the secrets of radiant, healthy skin with our expert beauty
        tips and guides.
      </Typography>

      <Stack
        className="beauty-tips-grid"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        spacing={3}
      >
        {tips.length ? (
          tips.map((tip, index) => (
            <Stack key={index} className="tip-card">
              <div
                className="tip-image"
                style={{ backgroundImage: `url(${tip.image})` }}
              ></div>
              <Typography className="tip-title">{tip.title}</Typography>
              <Typography className="tip-desc">{tip.desc}</Typography>
              <Button className="tip-btn">Read More →</Button>
            </Stack>
          ))
        ) : (
          <Typography className="no-data">No Tips Available</Typography>
        )}
      </Stack>
    </Stack>
  </Container>
</div>
    </div>
  );
}
