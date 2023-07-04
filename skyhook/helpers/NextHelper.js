"use strict";
import ReactHelper from './ReactHelper';

// TODO: page rendering
export default class NextHelper extends ReactHelper {
  // export async function getServerSideProps(context) {
  //   return {
  //     props: { ...h.setTitle("Log in") },
  //   };
  // }
  static setTitle = (title = null, description = null) =>
    title
      ? description
        ? { head: { title, description } }
        : { head: { title } }
      : null;

  // h.getTitle(pageProps, APP.alias)
  static getTitle = (pageProps, appName = "Next.js", delimiter = "|") => (
    <title>
      {"head" in pageProps
        ? `${pageProps.head.title} ${delimiter} ${this.parseHtml(appName)}`
        : this.parseHtml(appName)}
    </title>
  );

  // h.getDescription(pageProps)
  static getDescription = (pageProps, defaultDescription) =>
    "head" in pageProps ? (
      "description" in pageProps.head ? (
        <meta name="description" content={pageProps.head.description} />
      ) : (
        <meta name="description" content={defaultDescription} />
      )
    ) : (
      <meta name="description" content={defaultDescription} />
    );

  // <Link { ...h.href('Dashboard') }> ..
  static href = (pathname, query = null) =>
    query ? { href: { pathname, query } } : { href: { pathname } };

  static hrefNoScroll = (pathname, query = null) =>
    query
      ? { href: { pathname, query }, scroll: false }
      : { href: { pathname }, scroll: false };
}
