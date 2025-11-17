import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../../../css/footer.css";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
    // Add your newsletter subscription logic here
  };

  return (
    <div className="footer-wrapper" ref={footerRef}>
      <Container className="footer-container">
        {/* MAIN GRID */}
        <div className="footer-grid">
          {/* BRAND SECTION */}
          <div className="footer-brand-section">
            <div className="footer-logo-box">
              <img className="footer-logo" src="/img/default4.jpeg" alt="logo" />
              <div className="footer-brand-name">SkinBloom</div>
            </div>
            <p className="footer-desc">
              Nurturing beauty through science and care. Discover elegance,
              confidence, and timeless radiance in every product we create.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/products" className="footer-link">
                Products
              </Link>
              <Link to="/help" className="footer-link">
                Help
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="footer-section-title">Contact</h3>
            <div className="footer-contact-item">
              <div className="contact-icon">📍</div>
              <div>Downtown, SEOUL</div>
            </div>
            <div className="footer-contact-item">
              <div className="contact-icon">📞</div>
              <div>+82 10 2897 7980</div>
            </div>
            <div className="footer-contact-item">
              <div className="contact-icon">📧</div>
              <div>contact@skinbloom.com</div>
            </div>
            <div className="footer-contact-item">
              <div className="contact-icon">🕐</div>
              <div>24/7 Support</div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="newsletter-box">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-subtitle">
              Subscribe for beauty tips & exclusive offers
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* TRUST & PAYMENT */}
        <div className="footer-trust">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🚚</span>
            <span>Free Shipping</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>100% Authentic</span>
          </div>
          <div className="payment-icons">
            <div className="payment-icon">VISA</div>
            <div className="payment-icon">MC</div>
            <div className="payment-icon">AMEX</div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 SkinBloom Cosmetics. All rights reserved.
          </p>
          <div className="footer-policy-links">
            <a href="#" className="policy-link">
              Privacy Policy
            </a>
            <a href="#" className="policy-link">
              Terms & Conditions
            </a>
            <a href="#" className="policy-link">
              Shipping Policy
            </a>
            <a href="#" className="policy-link">
              Return Policy
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
