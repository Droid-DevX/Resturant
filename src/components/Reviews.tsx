import { useState, useEffect, useRef, useCallback } from 'react';

interface ReviewData {
  avatar: string;
  name: string;
  stars: string;
  text: string;
}

const REVIEWS: ReviewData[] = [
  {
    avatar: 'M',
    name: 'Mudassir',
    stars: '★★★★★',
    text: '"Great taste and wonderful ambiance. The mutton biryani is the best I\'ve ever had in Gulbarga. Quick service and reasonable pricing. A must-visit for food lovers!"',
  },
  {
    avatar: 'S',
    name: 'MD Shoeb Ruman',
    stars: '★★★★☆',
    text: '"Excellent food quality and portions. The chicken mandi and shawarma are outstanding. Family-friendly environment. Prices are very reasonable for the quality served."',
  },
  {
    avatar: 'S',
    name: 'Muhammed Sarfarazhussain',
    stars: '★★★★★',
    text: '"One of the best family restaurants in Kalaburagi. The kebabs are perfectly spiced, and the ghee roast is heavenly. Highly recommended for anyone who loves authentic Mughlai cuisine!"',
  },
  {
    avatar: 'A',
    name: 'Ahmed Khan',
    stars: '★★★★☆',
    text: '"Visited with family and had a great time. The butter chicken and naan were delicious. Very good quality for the price. Staff is friendly and attentive."',
  },
  {
    avatar: 'R',
    name: 'Raghavendra S',
    stars: '★★★★★',
    text: '"Superb flavors! The Arabian platter is a royal feast in itself. Every item on the menu is well-prepared. Clean, hygienic, and welcoming. Will visit again!"',
  },
];

export default function Reviews() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getVisibleCount = useCallback(() => {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - getVisibleCount());

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      setReviewIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  }, [maxIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  // Update carousel transform
  useEffect(() => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('.review-card');
    const cardWidth = firstCard?.getBoundingClientRect().width || 340;
    const gap = 24;
    const offset = reviewIndex * (cardWidth + gap);
    carouselRef.current.style.transform = `translateX(-${offset}px)`;
  }, [reviewIndex]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setReviewIndex((prev) => Math.min(prev, Math.max(0, REVIEWS.length - getVisibleCount())));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCount]);

  // Touch support
  const touchStartRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setReviewIndex((prev) => Math.min(maxIndex, prev + 1));
      } else {
        setReviewIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const dotCount = maxIndex + 1;

  return (
    <section id="reviews" className="section reviews" data-reveal>
      <div className="container">
        <span className="section__label">Guest Experiences</span>
        <h2 className="section__title">
          What Our Guests <strong className="highlight">Say</strong>
        </h2>
        <div className="reviews__carousel-wrapper">
          <div
            className="reviews__carousel"
            id="reviews-carousel"
            ref={carouselRef}
            onMouseEnter={() => {
              if (autoScrollRef.current) clearInterval(autoScrollRef.current);
            }}
            onMouseLeave={startAutoScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {REVIEWS.map((review) => (
              <div key={review.name} className="review-card">
                <div className="review-card__header">
                  <div className="review-card__avatar">{review.avatar}</div>
                  <div>
                    <h4 className="review-card__name">{review.name}</h4>
                    <div className="review-card__stars">{review.stars}</div>
                  </div>
                </div>
                <p className="review-card__text">{review.text}</p>
                <small className="review-card__source">
                  <i className="fa-brands fa-google" /> Google Review
                </small>
              </div>
            ))}
          </div>
        </div>
        <div className="reviews__controls">
          <button
            className="reviews__btn"
            onClick={() => setReviewIndex((prev) => Math.max(0, prev - 1))}
            aria-label="Previous review"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className="reviews__dots">
            {Array.from({ length: dotCount }, (_, i) => (
              <div
                key={i}
                className={`reviews__dot ${i === reviewIndex ? 'active' : ''}`}
                onClick={() => setReviewIndex(i)}
              />
            ))}
          </div>
          <button
            className="reviews__btn"
            onClick={() => setReviewIndex((prev) => Math.min(maxIndex, prev + 1))}
            aria-label="Next review"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
