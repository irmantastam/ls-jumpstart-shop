import _ from "lodash";
import ProductSection from "../components/ProductSection";
import { getEntriesByContentType } from "../lib/helpers";
import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react"

export default function Home(props) {
  const page = _.get(props, "page");
  const updatedPage = useContentfulLiveUpdates(page, 'en-US') || page
  const sections = _.get(updatedPage, "fields.sections"); // this field is an array of page sections
  const headline = _.get(updatedPage, "fields.headline");

  const inspectorProps = useContentfulInspectorMode()

  console.log(page); // you can view this object in the console


  return (
    <>
      {/* {JSON.stringify(page)} */}
      <h1
        {...inspectorProps({
          entryId: page.sys.id,
          fieldId: "headline",
        })}
        className="font-bold text-2xl mb-4 text-center"
      >
        {headline}
      </h1>
      <div className="flex flex-col space-y-4">
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {
              const contentType = _.get(section, "sys.contentType.sys.id");
              const sectionId = _.get(section, "sys.id");
              const fields = _.get(section, "fields");
              if (contentType === "productSection") {
                return (
                  <ProductSection
                    key={sectionId}
                    id={sectionId}
                    fields={fields}
                  />
                );
              }

              if (contentType === "product") {
                return <>{contentType}</>;
              }

              return "";
            })
          : ""}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pageEntries = await getEntriesByContentType("landingPage", "home-page");
  let homepageEntry = _.get(pageEntries, "items[0]");

  return {
    props: {
      page: homepageEntry ? homepageEntry : {},
    },
  };
}
