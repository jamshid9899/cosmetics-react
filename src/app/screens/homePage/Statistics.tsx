import React from "react";
import { Box, Container, Stack, LinearProgress } from "@mui/material";

export default function Statistics() {
  const stats = [
    { label: "Customer Satisfaction", value: 98 },
    { label: "Natural Ingredients", value: 92 },
    { label: "Skin Safety Rating", value: 99 },
    { label: "Eco-Friendly Packaging", value: 85 },
  ];

  return (
    <div className="radiance-stats">
      <Container>
        <Box className="radiance-title">Beauty that Speaks in Numbers</Box>
        <Stack className="radiance-bars">
          {stats.map((item, i) => (
            <Box key={i} className="radiance-bar-item" style={{ position:"relative" }}>
              <Box className="radiance-label">{item.label}</Box>
              <Box className="radiance-value">{item.value}%</Box>
              <LinearProgress
                variant="determinate"
                value={item.value}
                className="radiance-progress"
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  );
}






