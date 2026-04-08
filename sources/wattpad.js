export const HOST = 'https://wattpad.com.vn';

const CONTENT_REGEX = /<div class="truyen">(.+?)<\/div>/;
const BACK_REGEX = /href='(.+?)' class='back'/;
const NEXT_REGEX = /href='(.+?)' class='back'/;

export default function (text) {
  return {
    __CONTENT__: text.match(CONTENT_REGEX)[1].trim(),
    __PREVIOUS__: text.match(BACK_REGEX)[1],
    __NEXT__: text.match(NEXT_REGEX)[1],
  };
}
