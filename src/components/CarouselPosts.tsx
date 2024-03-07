"use client";

import useSWR from "swr";
import { Review } from "@/types/reviewTypes";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReviewPost from "./ReviewPost";

export default function CarouselPosts() {
  const { data: reviews } = useSWR<Review[]>("/api/reviews");

  return (
    <section className="bg-c0 border-1 border-c1 rounded-3xl mt-20 mb-12">
      <Carousel
        autoPlay
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        className="pt-16 pb-6"
      >
        {reviews &&
          reviews
            .slice(0, 10)
            .map((review) => <ReviewPost key={review._id} review={review} />)}
      </Carousel>
    </section>
  );
}
