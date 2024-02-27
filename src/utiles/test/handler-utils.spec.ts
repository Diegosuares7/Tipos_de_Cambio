import { FaildReadDirectoryException } from '../exceptions/faild-read-directory.exception';
import { getHandlersFromDirectory } from '../handler-utils';

it('should throw a FaildReadDirectoryException when directory does not exist', () => {
  const directoryPath = 'path/to/nonexistent/directory';
  const country = 'US';

  expect(() => {
    getHandlersFromDirectory(directoryPath, country);
  }).toThrow(FaildReadDirectoryException);
});
