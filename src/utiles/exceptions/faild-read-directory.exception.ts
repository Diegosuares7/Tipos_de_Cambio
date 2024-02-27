import { StepProcessHandledException } from '../../exceptions/step-process-handled.exception';
import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { UTILES_ERROR_MESSAGES } from './utiles-exceptions.constants';

export class FaildReadDirectoryException extends StepProcessHandledException {
  constructor() {
    super(PROCESS_STEPS.SEARCH_COINS, UTILES_ERROR_MESSAGES.FAILD_READ_DIRECTORY);
    this.name = 'FaildReadDirectoryError';
  }
}
