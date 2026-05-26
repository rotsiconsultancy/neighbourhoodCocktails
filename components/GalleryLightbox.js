"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export function GalleryLightbox({ images }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((image) => image.category)))],
    [images]
  );

  const visibleImages = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((image) => image.category === activeCategory),
    [activeCategory, images]
  );

  const activeImage = activeIndex === null ? null : visibleImages[activeIndex];

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? visibleImages.length - 1 : currentIndex - 1
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === visibleImages.length - 1 ? 0 : currentIndex + 1
    );
  }

  return (
    <>
      <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
        {categories.map((category) => (
          <button
            className={category === activeCategory ? "active" : ""}
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setActiveIndex(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-masonry">
        {visibleImages.map((image, index) => (
          <button
            className={`gallery-tile ${image.featured ? "featured" : ""}`}
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${image.title}`}
          >
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
            <span>
              <strong>{image.title}</strong>
              <small>{image.category}</small>
            </span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title}>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery preview"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <button className="lightbox-nav previous" type="button" onClick={showPrevious} aria-label="Previous image">
            <FaChevronLeft aria-hidden="true" />
          </button>
          <figure className="lightbox-frame">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              priority
            />
            <figcaption>
              <strong>{activeImage.title}</strong>
              <span>{activeImage.caption}</span>
            </figcaption>
          </figure>
          <button className="lightbox-nav next" type="button" onClick={showNext} aria-label="Next image">
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
