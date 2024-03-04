import { StepProcessHandledException } from '../../../exceptions/step-process-handled.exception';
import { PARAGUAY_HANDLER_ERROR_MESSAGES } from './paraguay-error-handler-messages.constants';
import { PROCESS_STEPS } from '../../../exceptions/steps.constants';

export class InvalidTableException extends StepProcessHandledException {
  constructor(month: string) {
    super(PROCESS_STEPS.SEARCH_COINS, PARAGUAY_HANDLER_ERROR_MESSAGES.INVALID_MONTH_TABLE(month));
  }
}
