export const getDynamicImgUrl = (url: string): string => new URL(url, import.meta.url).href;
