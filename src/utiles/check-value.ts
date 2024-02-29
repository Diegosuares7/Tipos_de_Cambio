import { FailedResultException } from '../utiles/exceptions/faild-result.exception';
export function checkValue(value: string): void {
  if (!value) {
    throw new FailedResultException();
  }
}
