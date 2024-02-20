export function getCurrentDate(): string {
  const CurrentDate = new Date();
  const month = (CurrentDate.getMonth() + 1).toString().padStart(2, '0'); // Se agrega 1 porque los meses comienzan desde 0
  const day = CurrentDate.getDate().toString().padStart(2, '0');
  const year = CurrentDate.getFullYear().toString();
  return `${month}-${day}-${year}`;
}

export function getDateTimeForNameXml(): string {
  const fecha = new Date();

  const year = fecha.getFullYear();
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getDate().toString().padStart(2, '0');
  const hour = fecha.getHours().toString().padStart(2, '0');
  const minutes = fecha.getMinutes().toString().padStart(2, '0');

  const dateTimeFormatted = `${year}${month}${day}_${hour}${minutes}`;
  return dateTimeFormatted;
}
