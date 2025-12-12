"use server";
 
import { CAT_API_KEY } from "./env"; // 追加
 
type Image = {
  url: string;
};
 
export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": CAT_API_KEY }, // 追加
  });
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
    console.log(CAT_API_KEY );
  return images[0];
}
 
// Image型の配列であるかチェックする関数
function isImageArray(value: unknown): value is Image[] {
  // valueが配列であること
  if (!Array.isArray(value)) {
    return false;
  }
  // 配列の要素が全てImage型であること
  if (!value.every(isImage)) {
    return false;
  }
  return true;
}
 
// Image型であるかチェックする関数
function isImage(value: unknown): value is Image {
  // valueがオブジェクトであること
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // valueにurlフィールドがあること
  if (!("url" in value)) {
    return false;
  }
  // urlフィールドが文字列であること
  if (typeof (value as Image).url !== "string") {
    return false;
  }
  return true;
}