export function getCurrentDate(): string {
  const CurrentDate = new Date();
  const month = (CurrentDate.getMonth() + 1).toString().padStart(2, '0'); // Se agrega 1 porque los meses comienzan desde 0
  const day = CurrentDate.getDate().toString().padStart(2, '0');
  const year = CurrentDate.getFullYear().toString();
  return `${month}-${day}-${year}`;
}
