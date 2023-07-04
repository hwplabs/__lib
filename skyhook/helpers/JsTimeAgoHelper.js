"use strict";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import DateHelper from "./DateHelper";
import StringHelper from "./StringHelper";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

// https://www.npmjs.com/package/javascript-time-ago?activeTab=readme
// TODO:
export default class JsTimeAgoHelper extends DateHelper {
  constructor(dt) {
    super();
    this.f = timeAgo.format(new Date(dt), "twitter-minute-now");
    this.n = this.f.slice(0, -1);
    this.unit = this.f.slice(-1);
  }
  // "now", "59m", "23h", "Mar 4", "Apr 5, 2012"
  get text() {
    return this.f;
  }
  // "just now", "59m ago", "23h ago", "Mar 4th", "Apr 5th, 2012"
  get verbose() {
    let res = this.f;
    if (this.isNow()) res = "just " + res;
    else if (this.isToday()) res = res + " ago";
    else if (this.isDiffDay()) res = res + StringHelper.rank(this.n);
    else {
      let arr = this.f.split(" ");
      return `${arr[0]} ${arr[1]}${StringHelper.rank(this.n)}, ${arr[2]}`;
    }
    return res;
  }
  //
  isNow = () => this.f === "now";
  isToday = () => ["h", "m"].includes(this.f.slice(-1));
  isDiffDay = () => this.f.split(" ").length === 2;
  isDiffYear = () => this.f.split(" ").length === 3;
}
