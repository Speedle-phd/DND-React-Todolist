export const capitalize = (s: string) => {
   const capitalize = s.slice(0, 1).toLocaleUpperCase() + s.slice(1, s.length)
   return capitalize
}