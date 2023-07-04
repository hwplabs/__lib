"use strict";
import parse from "html-react-parser";

export default class ReactHelper {
  // h.parseHtml(str)
  static parseHtml = (str) => parse(str);

  // h.parseHtmlResponse(err)
  static parseHtmlResponse(err) {
    if (err === "?") {
      err = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Error</title>
          </head>
          <body>
            <pre>Cannot GET /jso/e5e47150-bc2c-11ed-9b49-492949f4ff3d</pre>
          </body>
        </html>`;
    }

    if (typeof err === "string" && err.search("<pre>") > -1) {
      return err.split("<pre>")[1].split("</pre>")[0];
    }
    return err.message ?? err;
  }

  // <div className={h.classNames()}>
  static classNames = (...classes) => classes.filter(Boolean).join(" ");

  // await sleep(3000)
  static sleep = (milliseconds = 1500) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  //
  static location = (url) => window.location.assign(url);

  static locationNew = (url) =>
    window.open(url, "_blank") || window.location.replace(url);
}
