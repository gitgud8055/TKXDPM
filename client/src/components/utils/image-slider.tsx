import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface ImageSlideProps {
  images?: string[];
  editMode: boolean;
}
export default function ImageSlider({ images, editMode }: ImageSlideProps) {
  if (!images || images.length === 0) return null;
  console.log("rendered");
  return !editMode ? (
    <Carousel
      responsive={responsive}
      ssr
      showDots
      infinite
      containerClass="container-with-dots"
    >
      {images.map((url, id) => (
        <img
          src={`/attachments/${url}`}
          alt=""
          loading="lazy"
          key={url + id}
          draggable={false}
          className="h-full w-full p-2.5"
        />
      ))}
    </Carousel>
  ) : (
    <></>
  );
}
