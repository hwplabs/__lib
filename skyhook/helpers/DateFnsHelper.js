"use strict";

import { sub, add } from "date-fns";
import DateHelper from "./DateHelper";

// https://devdocs.io/date_fns/
// TODO:
export default class DateFnsHelper extends DateHelper {
  //
  static secondToMinute = (t = 60, invert = false) =>
    invert ? t * 60 : t / 60;
  static minuteToHour = (t = 60, invert = false) => (invert ? t * 60 : t / 60);
  static hourToDay = (t = 24, invert = false) => (invert ? t * 24 : t / 24);
  static dayToWeek = (t = 7, invert = false) => (invert ? t * 7 : t / 7);
  static weekToMonth = (t = 4, invert = false) => (invert ? t * 4 : t / 4);
  static monthToQuarter = (t = 3, invert = false) => (invert ? t * 3 : t / 3);
  static quarterToYear = (t = 4, invert = false) => (invert ? t * 4 : t / 4);
  //
  static present = () => super.iso();
  //
  static past = (hrs = 1, dt = null) => {
    const d = dt ? new Date(super.dateTime(dt)) : new Date();
    return hrs < 1
      ? super.iso(sub(d, { minutes: parseFloat(hrs) * 60 }))
      : super.iso(sub(d, { hours: parseFloat(hrs) }));
  };
  //
  static future = (hrs = 1, dt = null) => {
    const d = dt ? new Date(super.dateTime(dt)) : new Date();
    return hrs < 1
      ? super.iso(add(d, { minutes: parseFloat(hrs) * 60 }))
      : super.iso(add(d, { hours: parseFloat(hrs) }));
  };
}
