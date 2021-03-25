import resourceReducer from 'store/reducers/resourceReducer';
import { ResourceState } from 'types/resource';
import { Actions } from 'types/state';

describe('Announcement reducer', () => {
  const testDate = new Date(0);

  const testState: ResourceState = {
    resources: {
      test_id_existing: {
        _id: 'test_id_existing',
        content: 'Content Two',
        link: null,
        dateItemCreated: testDate,
        lastEdited: testDate
      }
    },
    results: [],
    numResults: 0
  };

  test('rejects non-successful requests', () => {
    const testAction = {
      type: 'FETCH_RESOURCE',
      status: 'FAILURE',
      payload: { data: {} }
    };

    expect(resourceReducer(testState, testAction as Actions)).toEqual(testState);
  });

  describe('handles FETCH_RESOURCE type', () => {
    test('handles resource fetch', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCE',
        status: 'SUCCESS',
        payload: {
          data: {
            resource: {
              _id: 'test_id',
              content: 'Content',
              link: null,
              dateItemCreated: testDate,
              lastEdited: testDate
            }
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        ...testState,
        resources: {
          ...testState.resources,
          test_id: {
            _id: 'test_id',
            content: 'Content',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        }
      });
    });

    test('handles resource update', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCE',
        status: 'SUCCESS',
        payload: {
          data: {
            resource: {
              _id: 'test_id_existing',
              content: 'Content Updated',
              link: null,
              dateItemCreated: testDate,
              lastEdited: testDate
            }
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        ...testState,
        resources: {
          ...testState.resources,
          test_id_existing: {
            _id: 'test_id_existing',
            content: 'Content Updated',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        }
      });
    });
  });

  describe('handles FETCH_RESOURCES type', () => {
    test('handles multiple resource fetch', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCES',
        status: 'SUCCESS',
        payload: {
          data: {
            resources: [{
              _id: 'test_id',
              content: 'Content',
              link: null,
              dateItemCreated: testDate,
              lastEdited: testDate
            }],
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        ...testState,
        resources: {
          test_id_existing: {
            _id: 'test_id_existing',
            content: 'Content Two',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          },
          test_id: {
            _id: 'test_id',
            content: 'Content',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        }
      });
    });

    test('handles multiple resource update', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCES',
        status: 'SUCCESS',
        payload: {
          data: {
            resources: [
              {
                _id: 'test_id',
                content: 'Content',
                link: null,
                dateItemCreated: testDate,
                lastEdited: testDate
              },
              {
                _id: 'test_id_existing',
                content: 'Content Updated',
                link: null,
                dateItemCreated: testDate,
                lastEdited: testDate
              }],
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        ...testState,
        resources: {
          test_id_existing: {
            _id: 'test_id_existing',
            content: 'Content Updated',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          },
          test_id: {
            _id: 'test_id',
            content: 'Content',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        }
      });
    });
  });

  describe('handles FETCH_RESOURCE_RESULTS type', () => {
    test('handles resource results fetch', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCE_RESULTS',
        status: 'SUCCESS',
        payload: {
          data: {
            resources: [{
              _id: 'test_id',
              content: 'Content',
              link: null,
              dateItemCreated: testDate,
              lastEdited: testDate
            }],
            numResults: 1,
            results: ['test_id']
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        resources: {
          ...testState.resources,
          test_id: {
            _id: 'test_id',
            content: 'Content',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        },
        numResults: 1,
        results: ['test_id']
      });
    });

    test('handles resource results update', () => {
      const testAction: Actions = {
        type: 'FETCH_RESOURCE_RESULTS',
        status: 'SUCCESS',
        payload: {
          data: {
            resources: [{
              _id: 'test_id_existing',
              content: 'Content Updated',
              link: null,
              dateItemCreated: testDate,
              lastEdited: testDate
            }],
            numResults: 1,
            results: ['test_id_existing']
          }
        }
      };

      expect(resourceReducer(testState, testAction)).toEqual({
        resources: {
          ...testState.resources,
          test_id_existing: {
            _id: 'test_id_existing',
            content: 'Content Updated',
            link: null,
            dateItemCreated: testDate,
            lastEdited: testDate
          }
        },
        numResults: 1,
        results: ['test_id_existing']
      });
    });
  });
});
