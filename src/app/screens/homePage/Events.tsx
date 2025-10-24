import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const beautyEvents = [
  {
    title: "Radiance Glow Workshop",
    date: "November 12, 2025",
    location: "Seoul Beauty Hall",
    desc: "Join our skincare experts to learn daily glow routines with our newest serum line.",
    img: "/img/sale1.jpeg",
  },
  {
    title: "Pure Essence Launch",
    date: "December 3, 2025",
    location: "Tokyo Grand Studio",
    desc: "Experience the unveiling of our Pure Essence collection with live demonstrations.",
    img: "/img/sale2.jpeg",
  },
  {
    title: "Natural Beauty Talk",
    date: "January 10, 2026",
    location: "Paris Skin Lounge",
    desc: "A global conversation on sustainable skincare and natural ingredients.",
    img: "/img/sale3.jpeg",
  },
];

export default function Events() {
  return (
    <div className="beauty-events-section">
      <Container>
        <Stack className="beauty-events-header">
          <Box className="beauty-events-title">Beauty Moments</Box>
          <Box className="beauty-events-subtitle">
            Discover our skincare workshops, new launches, and beauty experiences.
          </Box>
        </Stack>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          slidesPerView={1.2}
          centeredSlides
          spaceBetween={40}
          loop
          className="beauty-events-swiper"
        >
          {beautyEvents.map((e, i) => (
            <SwiperSlide key={i} className="beauty-event-card">
              <div className="beauty-event-img">
                <img src={e.img} alt={e.title} />
              </div>

              <div className="beauty-event-overlay">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>

                <div className="beauty-event-info">
                  <span>📅 {e.date}</span>
                  <span>📍 {e.location}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
