import { StepProcessHandledException } from '../../../exceptions/step-process-handled.exception';
import { PROCESS_STEPS } from '../../../exceptions/steps.constants';
import { PARAGUAY_HANDLER_ERROR_MESSAGES } from './paraguay-error-handler-messages.constants';

export class InvalidDayException extends StepProcessHandledException {
  constructor(day: string) {
    super(PROCESS_STEPS.SEARCH_COINS, PARAGUAY_HANDLER_ERROR_MESSAGES.INVALID_DAY(day));
  }
}
