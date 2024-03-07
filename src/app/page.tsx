import CarouselPosts from "@/components/CarouselPosts";
import Discussions from "@/components/Discussions";

export default function Home() {
  return (
    <section>
      <CarouselPosts />
      <div>
        <Discussions />
      </div>
    </section>
  );
}
