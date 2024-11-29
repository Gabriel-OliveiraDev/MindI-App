// Converte string DD/MM/YYYY para Date
export function parseDate(dateString: string): Date | null {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(dateString)) return null;

  const [day, month, year] = dateString.split('/').map(Number);
  console.log(new Date(year, month - 1, day));
  return new Date(year, month - 1, day); // Meses começam em 0
}
