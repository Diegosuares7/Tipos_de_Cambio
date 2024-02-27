import { ProcessResponse, ProcessResponseEnum } from '../entities/process-response.entity';

export function createSuccesResponse(metadata: string): ProcessResponse {
  return {
    status: ProcessResponseEnum.SUCCESS,
    metadata,
  };
}

export function createErrorResponse(errorMessage: string): ProcessResponse {
  return {
    status: ProcessResponseEnum.ERROR,
    errorMessage,
  };
}
