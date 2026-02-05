import { useFeedModel } from "./feed.model";
import { FeedView } from "./feed.view";

export function FeedViewModel() {
  const methods = useFeedModel();
  return <FeedView {...methods} />;
}
