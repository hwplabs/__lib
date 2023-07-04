"use strict";

import { Calender as k } from "../constants";

// TODO:
export default class DateHelper {
  /////////////////////////////////////////////////////
  // https://www.w3schools.com/js/js_dates.asp
  static d = new Date().toISOString();
  // Sun Jan 01 1970 011:00:00 GMT+0100 (West Africa Standard Time)
  static str = (str = null) =>
    str ? new Date(str).toString() : new Date().toString();
  // 2023-04-23T08:43:50.000Z
  static iso = (str = null) =>
    str ? new Date(str).toISOString() : new Date().toISOString();
  // 1686524400000 (13/ms)
  static now = (dt = null) => (dt ? Date.parse(this.iso(dt)) : Date.now());
  // 1686524400 (10/s)
  static epoch = (dt = null) => this.now(dt) / 1000;
  // 1970-01-01
  static date = (dt = null) => (dt ? dt.slice(0, 10) : this.iso().slice(0, 10));
  // 00:00:00
  static time = (dt = null) =>
    dt ? dt.slice(11, 19) : this.iso().slice(11, 19);
  // 1970-01-01 00:00:00
  static dateTime = (dt = null) => `${this.date(dt)} ${this.time(dt)}`;
  // 19700101000000123
  static dateTimeTrim = (dt = null) =>
    `${this.date(dt)}${this.time(dt)}`.replaceAll("-", "").replaceAll(":", "");
  /////////////////////////////////////////////////////
  static isIn_LastDays = (dt, days = 30) => true;
  static isIn_NextDays = (dt, days = 30) => true;

  static isToday = (dt) => this.date(dt) === this.date();
  static isThisWeek = (dt) => true;
  static isThisMonth = (dt) => true;
  static isThisQuarter = (dt) => true;
  static isThisYear = (dt) => true;

  static isYesterday = (dt) => true;
  static isDayBeforeYesterday = (dt) => true;
  static isLastWeek = (dt) => true;
  static isLastMonth = (dt) => true;
  static isLastQuarter = (dt) => true;
  static isLastYear = (dt) => true;

  static isTomorrow = (dt) => true;
  static isNextTomorrow = (dt) => true;
  static isNextWeek = (dt) => true;
  static isNextMonth = (dt) => true;
  static isNextQuarter = (dt) => true;
  static isNextYear = (dt) => true;

  /////////////////////////////////////////////////////
  // https://www.w3schools.com/php/func_date_date_format.asp

  static D() {
    return k.DAY_SHORT[i];
  }
  //
  static M() {
    return k.MONTH_SHORT[i];
  }
  // h.dtSocial(item.timestamp)
  // Ex. 2023-02-14T09:57:05+0000 => Jan 1, 1970
  // 2023-04-23T08:43:50.000Z
  // static dtSocial(dt, f = "M j, Y") {
  //   let ts = dt && dt.length >= 10 ? dt : "1970-01-01 00:00:00",
  //     date = new Date(ts),
  //     nth = { 1: "st", 2: "nd", 3: "rd" },
  //     Y = ts.substr(0, 4), // 1992
  //     y = ts.substr(2, 2), // '92
  //     m = ts.substr(5, 2), // 09
  //     n = Number(m), // 9
  //     F = array.values(k.MONTH)[n], // September
  //     M = array.keys(k.MONTH)[n], // Sep
  //     d = ts.substr(8, 2), // 15
  //     j = Number(d), // 01 as 1
  //     j_ = j.toString().at(-1),
  //     S = [11, 12, 13].includes(j)
  //       ? "th"
  //       : Object.keys(nth).includes(j_)
  //       ? nth[j_]
  //       : "th", // nth
  //     w = date.getDay(), // 0-6 for Sun-Sat
  //     l = k.DAY[w], // Tuesday
  //     D = k.DAY_SHORT[w], // Tue
  //     H = ts.substr(11, 2) || "00", // 24hrs 00-23
  //     G = Number(H), // 24hrs 0-23
  //     g = G > 0 && G < 13 ? G : Math.abs(G - 12), // 12hrs 1-12
  //     h = g < 10 ? `0${g}` : g, // 12hrs 1 as 01
  //     i = ts.substr(14, 2) || "00", // mins
  //     s = ts.substr(17, 2) || "00", // secs
  //     a = G < 12 ? "am" : "pm", // am/pm
  //     A = a.toUpperCase(), // AM/PM
  //     U = date.getTime(); // epoch ms

  //   // return [
  //   //   ts,
  //   //   Y,
  //   //   y,
  //   //   m,
  //   //   n,
  //   //   F,
  //   //   M,
  //   //   d,
  //   //   j,
  //   //   j_,
  //   //   S,
  //   //   w,
  //   //   l,
  //   //   D,
  //   //   H,
  //   //   G,
  //   //   g,
  //   //   h,
  //   //   i,
  //   //   s,
  //   //   a,
  //   //   A,
  //   // ].join("/");

  //   switch (f) {
  //     case "M j":
  //       return `${M} ${j}`;
  //     case "M jS":
  //       return `${M} ${j}${S}`;
  //     case "M j, H:i":
  //       return `${M} ${j}, ${H}:${i}`;
  //     case "d/m/y H:i":
  //       return `${d}/${m}/${y} ${H}:${i}`;
  //     case "d/m/Y H:i":
  //       return `${d}/${m}/${Y} ${H}:${i}`;
  //     default:
  //       return `${M} ${j}, ${Y}`;
  //   }
  // }
}
