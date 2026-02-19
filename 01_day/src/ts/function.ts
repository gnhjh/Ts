export const sliceIcon = (Fname: string, Lname: string) => {
  return `${Fname.slice(0, 1)}${Lname.slice(0, 1)}`;
};

export const inputLenght = (arr: string[]) => {
  return arr.every((input) => input.length > 2);
};

export const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "i");

  return text.replace(regex, `<span class="highlight">$1</span>`);
};
