import { getReviews } from "@/entities/order/api/actions";
import { ProductFeed } from "@/widgets/product-feed/product-feed";
import { ReviewsSlider } from "@/widgets/reviews-slider/reviews-slider";

export default async function HomePage() {
  const reviews = await getReviews();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <ReviewsSlider reviews={reviews} />
      <ProductFeed />
    </div>
  );
}
