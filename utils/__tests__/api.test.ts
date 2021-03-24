import { createSuccessPayload, requireUrlParam } from 'utils/api';
import { ServerRequestType, ServerResponseType } from 'types/server';

describe('API utility functions', () => {
  describe('createSuccessPayload', () => {
    test('returns valid payload', () => {
      const result = createSuccessPayload<number>(12);
      expect(result).toEqual({
        data: 12,
        meta: { success: true }
      });
    });
  });

  describe('requireUrlParam', () => {
    test('throws on not found', () => {
      const middleware = requireUrlParam('id');
      const mockNext = jest.fn();

      expect(() => middleware({ query: {} } as ServerRequestType, {} as ServerResponseType, mockNext)).toThrow();
      expect(mockNext.mock.calls.length).toBe(0);
    });

    test('calls next on success', () => {
      const middleware = requireUrlParam('id');
      const mockNext = jest.fn();

      expect(() => middleware({ query: { id: 'test' } as unknown } as ServerRequestType, {} as ServerResponseType, mockNext)).not.toThrow();
      expect(mockNext.mock.calls.length).toBe(1);
    });
  });
});
