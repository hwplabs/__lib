"use strict";

import { Calender } from "../constants";

    // "money".slice(-1),
    // "money".slice(1),
    // "money".slice(0, -1),

export default class StringHelper {
  // 1234567890123
  static uuid = Date.now();
  // 1,970 = 1970
  static int = (n) => parseInt(n.toString().replaceAll(",", ""));
  // 1,970 = 1970.00
  static float = (n, dp = 2) =>
    parseFloat(n.toString().replaceAll(",", "")).toFixed(dp);
  //
  static encode = (str) => btoa(str);
  //
  static decode = (str) => atob(str);
  // TUGBEH EMMANUEL
  static upper = (str) => str.toUpperCase();
  // tugbeh emmanuel
  static lower = (str) => str.toLowerCase();
  // Tugbeh Emmanuel
  static title(str, strict = false) {
    let arr = [];
    str
      .split(" ")
      .map((char) =>
        arr.push(
          `${char[0].toUpperCase()}${
            strict ? char.slice(1).toLowerCase() : char.slice(1)
          }`
        )
      );
    return arr.join(" ");
  }
  // Tugbeh Emmanuel = TE | Tugbeh | Tugbeh, E. | Tugbeh, E.O.
  static initials(str, skipFirst = false) {
    let arr = [];
    if (skipFirst) {
      arr = str.split(" ");
      switch (arr.length) {
        case 3:
          return `${this.title(
            arr[0],
            true
          )}, ${arr[1][0].toUpperCase()}.${arr[2][0].toUpperCase()}.`;
        case 2:
          return `${this.title(arr[0], true)}, ${arr[1][0].toUpperCase()}.`;
        default:
          return `${this.title(arr[0], true)}`;
      }
    } else {
      str.split(" ").map((char) => arr.push(char[0].toUpperCase()));
      return arr.join("");
    }
  }
  // str...
  static crop = (str, len = 160) =>
    str ? (str.length > len ? `${str.slice(0, len - 3)}...` : str) : "";
  // "money".slice(-1),
  // "money".slice(0, -1),
  // 1st, 2nd, 3rd, 4th
  static rank = (n, append = false) => {
    let [nth, lastChar] = ["", n.toString().slice(-1)];

    if ([11, 12, 13].includes(Number(n))) nth = "th";
    else {
      switch (lastChar) {
        case "1":
          nth = "st";
          break;
        case "2":
          nth = "nd";
          break;
        case "3":
          nth = "rd";
          break;
        default:
          nth = "th";
      }
    }

    // return lastChar;
    return append ? n + nth : nth;
  };
  // 10 in 100 = 10%
  static rate = (total, fraction, dp = 2) =>
    ((parseFloat(fraction) * 100) / parseFloat(total)).toFixed(dp);
  // 10% of 100 = 10
  static part = (total, percent, dp = 2) =>
    ((parseFloat(total) * parseFloat(percent)) / 100).toFixed(dp);
  //
  static parse = (objOrStr, toJson = false) =>
    toJson ? JSON.parse(objOrStr) : JSON.stringify(objOrStr);
  //
  static compact = (n, notation = "compact") =>
    Intl.NumberFormat("en", { notation }).format(this.int(n)).toLowerCase();
  // 1970 = 1,970 | 1,970.00
  static money = (n) =>
    Number(n.toString().replaceAll(",", "")).toLocaleString();

  // $1 = N462
  static toNaira = (n, rate = 462) => (parseFloat(n) * rate).toFixed(2);
  // N462 = $1
  static toDollar = (n, rate = 462) => (parseFloat(n) / rate).toFixed(2);
  //
  static dieDump = (obj) => JSON.stringify(obj);
  //
  static varDump(obj) {
    if (typeof obj === "object") {
      let [str, res] = ["", JSON.parse(obj)];
      Object.entries(res).map(([k, v], i) => {
        // (float) price => 3.14,
        str +=
          typeof v === "object"
            ? this.varDump(v)
            : `(${typeof v}) ${k} => ${v}`;
      });
      return <pre>{str}</pre>;
    }
    return obj;
  }
  // ////////////////////////////////////////////////////////////
  static slug = (str, urlEncoded = false) => {};
  static unslug = (str, urlEncoded = false) => {};

  // h.queryStr(queryParams)
  static queryStr(obj) {
    let f = "?";
    for (let [key, value] of Object.entries(obj)) {
      f += `${key}=${value}&`;
    }
    return f.slice(0, -1);
  }

  static asQueryStr = (obj, startsWith = false) => {};

  static asQueryObj = (str) => {};

  static toEnumKey = (arr, value) => {};

  static toEnumValue = (arr, key) => {};

  static toEnumId = (arr) => {};
}
