import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react"

function MyApp({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider locale="en-US" enableLiveUpdates={pageProps.draftMode}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ContentfulLivePreviewProvider>
  );
}

export default MyApp;
