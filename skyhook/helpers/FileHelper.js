"use strict";

import { Color } from "../constants";
import CollectionHelper from "./CollectionHelper";

export default class FileHelper {
  // my-picture.jpeg = 1234567890123.jpeg
  static uuid = (str) => Date.now() + str.split(".")[1];
  // onChange(FileHelper.targetFile | (ev) => FileHelper.targetFile(ev, handleUpload))
  static targetFile = (ev, callback = null) =>
    callback ? callback(ev.target.files[0]) : ev.target.files[0];
  // (NA)
  static avatar = (str = "not available") =>
    `https://ui-avatars.com/api/?name=${str.replaceAll(" ", "+")}`;
  //
  static avatarColor = (str = "not available", bg = "#0093dd", fg = "#fff") =>
    `https://ui-avatars.com/api/?name=${str.replaceAll(
      " ",
      "+"
    )}&background=${bg.replace("#", "")}&color=${fg.replace("#", "")}`;
  //
  static avatarColorMix = (str = "not available") =>
    `https://ui-avatars.com/api/?name=${str.replaceAll(
      " ",
      "+"
    )}&background=${CollectionHelper.random(Color.MUI).replace("#", "")}&color=fff`;
}
