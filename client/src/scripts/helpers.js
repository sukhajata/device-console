

export function removeInvisibleChars(input) {
  return input.trim().replace(/[\u200b]/g, "").replace(/[^\u0000-\u007E]/g, "");
}
