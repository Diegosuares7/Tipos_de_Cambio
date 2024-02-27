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

export function getCurrentDateDDMMYYYY(): string {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}
