import { parseReviewConfig, type ReviewSearchParams } from "@/app/constants/japanese-review";
import { ReviewSession } from "@/app/components/japanese/review/review-session";

export default async function ReviewExercisePage({ params, searchParams }: {
  params: Promise<{ exerciseType: string }>;
  searchParams: Promise<ReviewSearchParams>;
}) {
  const [{ exerciseType }, query] = await Promise.all([params, searchParams]);
  const config = parseReviewConfig(query, exerciseType);
  return <ReviewSession key={`${exerciseType}-${JSON.stringify(query)}`} config={config} />;
}
