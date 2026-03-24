import { JsonLd } from "../components/ui/json-ld";
import { HomeContent } from "../components/home-content";
import {
  PERSON_JSONLD,
  WEBSITE_JSONLD,
  PROFILE_PAGE_JSONLD,
} from "../constants/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={PERSON_JSONLD} />
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={PROFILE_PAGE_JSONLD} />
      <HomeContent />
    </>
  );
}
