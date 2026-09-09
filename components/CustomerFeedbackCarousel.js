"use client";

import { useState, useEffect, useRef } from "react";
import { FaStar, FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaGoogle, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

export function CustomerFeedbackCarousel({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      case "twitter":
      case "x":
        return <FaTwitter />;
      case "facebook":
        return <FaFacebook />;
      case "google":
        return <FaGoogle />;
      default:
        return <FaInstagram />;
    }
  };

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials, isPaused]);

  if (!testimonials || testimonials.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section feedback-carousel-section" id="reviews">
      <div className="section-header">
        <div>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>What Our Guests Say</div>
          <h2>Stories from the Neighbourhood</h2>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const deltaX = e.changedTouches[0].clientX - touchStartX.current;
          if (deltaX > 40) prevSlide();
          if (deltaX < -40) nextSlide();
        }}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((item) => (
            <div className="feedback-card-slide" key={item._id || item.name}>
              <div className="feedback-card-inner">
                <div className="feedback-card-top">
                  <div className="star-rating" aria-label={`${item.rating || 5} out of 5 stars`}>
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <FaQuoteLeft className="quote-watermark" />
                </div>

                <p className="feedback-quote">{item.quote}</p>

                <div className="feedback-card-footer">
                  <div className="client-info">
                    <strong className="client-name">{item.name}</strong>
                    {item.eventType && (
                      <span className="client-event-tag">{item.eventType}</span>
                    )}
                  </div>

                  {(item.socialHandle || item.socialUrl) && (
                    <a
                      href={item.socialUrl || "https://instagram.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-badge"
                      aria-label={`${item.socialPlatform || "Social"} link for ${item.name}`}
                    >
                      <span className="social-icon">
                        {getSocialIcon(item.socialPlatform)}
                      </span>
                      {item.socialHandle && (
                        <span className="social-handle">{item.socialHandle}</span>
                      )}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots">
          {testimonials.map((item, idx) => (
            <button
              key={item._id || idx}
              type="button"
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
