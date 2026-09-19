import type { ReviewSearchParams } from "@/app/constants/japanese-review";
import { ReviewSettings } from "@/app/components/japanese/review/review-settings";

export default async function ReviewPage({ searchParams }: {
  searchParams: Promise<ReviewSearchParams>;
}) {
  const query = await searchParams;
  return <ReviewSettings key={JSON.stringify(query)} />;
}
