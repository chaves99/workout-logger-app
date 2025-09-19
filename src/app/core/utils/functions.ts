export function title(token?: string): string {
  if (!token) return "";
  return token
    .split(" ")
    .reduce((accumulator, current) => {
      const titleTypeString = current[0].toUpperCase() + current.slice(1).toLowerCase();
      return accumulator.concat(" ").concat(titleTypeString);
    }, "").trim();

}
