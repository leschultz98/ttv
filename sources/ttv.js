export const HOST = 'https://truyen.tangthuvien.vn';

const CONTENT_REGEX = /<div class="box-chap.+?>(.+?)<\/div>/;
const NUMBER_REGEX = /chuong-(\d+)$/;

export default function (text, path) {
  const number = +path.match(NUMBER_REGEX)?.[1];
  return {
    __CONTENT__: text.match(CONTENT_REGEX)[1].trim(),
    __PREVIOUS__: path.replace(NUMBER_REGEX, 'chuong-' + (number - 1)),
    __NEXT__: path.replace(NUMBER_REGEX, 'chuong-' + (number + 1)),
  };
}
