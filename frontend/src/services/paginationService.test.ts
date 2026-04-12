import { describe, expect, it } from 'vitest';
import getPaginationBreadcrumbs from './paginationService';

describe('getPaginationBreadcrumbs', () => {
  it('should return less than window size if total pages is less than window size', () => {
    const result = getPaginationBreadcrumbs({
      currentIndex: 0,
      totalPages: 3,
      windowSize: 5,
    });
    expect(result.length).toBe(3);
  });

  it('should return center items when index is in the middle', () => {
    const result = getPaginationBreadcrumbs({
      currentIndex: 2,
      totalPages: 5,
      windowSize: 3,
    });
    expect(result).toEqual([2, 3, 4]);
  });

  it('should return last items on final index', () => {
    const result = getPaginationBreadcrumbs({
      currentIndex: 4,
      totalPages: 5,
      windowSize: 3,
    });
    expect(result).toEqual([3, 4, 5]);
  });

  it('should return first items on initial index', () => {
    const result = getPaginationBreadcrumbs({
      currentIndex: 0,
      totalPages: 5,
      windowSize: 3,
    });
    expect(result).toEqual([1, 2, 3]);
  });
});
