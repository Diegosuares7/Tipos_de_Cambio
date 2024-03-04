import { PROCESS_STEPS } from '../../exceptions/steps.constants';
import { StepProcessHandledException } from '../../exceptions/step-process-handled.exception';
import { ERROR_MESSAGES } from './errors-exceptions.constants';

export class NotFoundCoinException extends StepProcessHandledException {
  constructor() {
    super(PROCESS_STEPS.SEARCH_COINS, ERROR_MESSAGES.COIN_NOT_FOUND);
    this.name = 'NotFoundCoinException';
  }
}
