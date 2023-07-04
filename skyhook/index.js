//
// import {
//   NGN,
//   i,
//   __,
//   cx,
//   dd,
//   vd,
//   $,
//   kk,
//   nth,
//   dt,
//   ts,
//   E,
//   Arr,
//   Str,
//   zzz,
// } from "lib/skyhook";

import { Currency } from "lib/skyhook/constants";
import {
  CollectionHelper,
  DateHelper,
  EnumHelper,
  NextHelper,
  ReactHelper,
  StringHelper,
} from "lib/skyhook/helpers";

export const NGN = Currency.NAIRA.symbol;

export const i = (t, d = null) => NextHelper.setTitle(t, d);
export const __ = (str) => ReactHelper.parse(str);
export const cx = (args) => ReactHelper.classNames(args);

export const dd = (obj) => StringHelper.dieDump(obj);
export const vd = (obj) => StringHelper.varDump(obj);

export const $ = (n, asFloat = false) => StringHelper.money(n, asFloat);
export const kk = (n) => StringHelper.compact(n, true);
export const nth = (n, append = false) => StringHelper.rank(n, append);

export const dt = (date, f) => DateHelper.format(date, f);
export const ts = () => Date.now();

export const E = (list, f) => EnumHelper.format(list, f);
export const Arr = CollectionHelper;
export const Str = StringHelper;

export const zzz = async (ms = 1500) => await ReactHelper.sleep(ms);
