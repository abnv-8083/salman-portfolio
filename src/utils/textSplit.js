/**
 * Helper to split text into animated span words or characters
 * without requiring GSAP Club GreenSock SplitText
 */
export const splitWords = (text) => {
  if (!text) return [];
  return text.split(" ").map((word, index) => ({
    word,
    id: `${word}-${index}`
  }));
};

export const splitChars = (text) => {
  if (!text) return [];
  return text.split("").map((char, index) => ({
    char,
    id: `${char}-${index}`
  }));
};
