import supertest from 'supertest';
import itemRouter from '../item_router';

const {
  connectDB, dropDB,
} = require('../../../../__jest__/helpers');

const request = supertest(itemRouter);

const itemData = {
  brief_content: 'Brief',
  full_content: 'This is a test content',
  requested_publication_date: Date.now(),
  recipient_groups: []
};

let validId = '';
const invalidId = '54697c792qc729108';

// Mocks requireAuth server middleware
jest.mock('../../authentication/requireLogin');

describe('Working item router', () => {
  beforeAll(async (done) => {
    try {
      connectDB(done);
    } catch (error) {
      done(error);
    }
  });

  afterAll(async (done) => {
    try {
      dropDB(done);
    } catch (error) {
      done(error);
    }
  });

  describe('single event modification', () => {
    describe('create one', () => {
      // * NOTE: Can require multiple checks depending on number of user permission levels
      it('requires valid permissions', async (done) => {
        try {
          const res = await request.post('/')
            .send({ body: itemData });
          expect(res.status).toBe(401);
          done();
        } catch (error) {
          done(error);
        }
      });

      // * NOTE: Can require multiple checks depending on number of non-unique fields
      describe('blocks creation of item with non-unique field', () => {
        it('blocks item creation when missing brief_content', async (done) => {
          try {
            const res = await request.post('/')
              .set('Cookie', 'Dummy Cookie')
              .send({
                full_content: itemData.full_content,
                requested_publication_date: itemData.requested_publication_date,
                recipient_groups: itemData.recipient_groups
              });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Missing required "brief_content" field');
            done();
          } catch (error) {
            done(error);
          }
        });

        it('blocks item creation when missing full_content', async (done) => {
          try {
            const res = await request.post('/')
              .set('Cookie', 'Dummy Cookie')
              .send({
                brief_content: itemData.brief_content,
                requested_publication_date: itemData.requested_publication_date,
                recipient_groups: itemData.recipient_groups
              });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Missing required "full_content" field');
            done();
          } catch (error) {
            done(error);
          }
        });

        it('blocks item creation when missing requested_publication_date', async (done) => {
          try {
            const res = await request.post('/')
              .set('Cookie', 'Dummy Cookie')
              .send({
                brief_content: itemData.brief_content,
                full_content: itemData.full_content,
                recipient_groups: itemData.recipient_groups
              });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Missing required "requested_publication_date" field');
            done();
          } catch (error) {
            done(error);
          }
        });

        it('blocks item creation when missing recipient_groups', async (done) => {
          try {
            const res = await request.post('/')
              .set('Cookie', 'Dummy Cookie')
              .send({
                brief_content: itemData.brief_content,
                full_content: itemData.full_content,
                requested_publication_date: itemData.requested_publication_date,
              });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Missing required "recipient_groups" field');
            done();
          } catch (error) {
            done(error);
          }
        });
      });

      // * NOTE: Can require multiple checks depending on number of non-unique fields
      it('succeeds', async (done) => {
        try {
          const res = await request.post('/')
            .set('Cookie', 'Dummy Cookie')
            .send(itemData);

          expect(res.status).toBe(201);
          // Item exists with all required fields
          expect(res.body.brief_content).toBeDefined();
          expect(res.body.full_content).toBeDefined();
          expect(res.body.requested_publication_date).toBeDefined();
          expect(res.body.recipient_groups).toBeDefined();
          expect(res.body._id).toBeDefined();

          validId = res.body._id;
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    describe('fetch one', () => {
      // * NOTE: Can require multiple checks depending on number of user permission levels
      // it('requires valid permissions', async (done) => {

      // });

      it('catches item doesn\'t exist', async (done) => {
        try {
          const res = await request.get(`/${invalidId}`);
          expect(res.status).toBe(404);
          expect(res.body.message).toBe('Couldn\'t find item with given id');
          done();
        } catch (error) {
          done(error);
        }
      });

      it('succeeds', async (done) => {
        try {
          const res = await request.get(`/${validId}`);
          expect(res.status).toBe(200);
          expect(res.body._id).toBeDefined();
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    describe('update one', () => {
      // * NOTE: Can require multiple checks depending on number of user permission levels
      // it('requires valid permissions', async (done) => {

      // });

      // * NOTE: Can require multiple checks depending on number of required fields
      // it('requires valid data', async (done) => {

      // });

      // * NOTE: Can require multiple checks depending on number of non-unique fields
      // it('blocks creation of item with non-unique field', async (done) => {

      // });

      it('catches item doesn\'t exist', async (done) => {
        try {
          const res = await request.put(`/${invalidId}`)
            .set('Cookie', 'Dummy Cookie')
            .send({ title: 'New title' });

          expect(res.status).toBe(404);
          expect(res.body.message).toBe('Couldn\'t find item with given id');
          done();
        } catch (error) {
          done(error);
        }
      });

      it('succeeds', async (done) => {
        try {
          const res = await request.put(`/${validId}`)
            .set('Cookie', 'Dummy Cookie')
            .send({ full_content: 'New content' });

          expect(res.status).toBe(200);
          expect(res.body.full_content).toBe('New content');
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    describe('delete one', () => {
      // * NOTE: Can require multiple checks depending on number of user permission levels
      // it('requires valid permissions', async (done) => {

      // });

      it('catches item doesn\'t exist', async (done) => {
        try {
          const res = await request.delete(`/${invalidId}`)
            .set('Cookie', 'Dummy Cookie');

          expect(res.status).toBe(404);
          expect(res.body.message).toBe('Couldn\'t find item with given id');
          done();
        } catch (error) {
          done(error);
        }
      });

      it('succeeds', async (done) => {
        try {
          const res = await request.delete(`/${validId}`)
            .set('Cookie', 'Dummy Cookie');

          expect(res.status).toBe(200);
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });

  describe('batch event modification', () => {
    // * NOTE: Currently unimplemented
    // describe('create multiple', () => {
    //   // * NOTE: Can require multiple checks depending on number of user permission levels
    //   // it('requires valid permissions', async (done) => {

    //   // });

    //   // * NOTE: Can require multiple checks depending on number of required fields
    //   // it('requires valid data', async (done) => {

    //   // });

    //   // * NOTE: Can require multiple checks depending on number of non-unique fields
    //   // it('blocks creation of item with non-unique field', async (done) => {

    //   // });

    //   it('succeeds', async (done) => {

    //   });
    // });

    describe('fetch multiple', () => {
      // * NOTE: Can require multiple checks depending on number of user permission levels
      // it('requires valid permissions', async (done) => {

      // });

      // * NOTE: Requires multiple checks
      // it('valid pagination', async (done) => {

      // });

      // * NOTE: Not needed with only GET ALL functionality
      // it('catches item doesn\'t exist', async (done) => {

      // });

      it('succeeds', async (done) => {
        try {
          // Create two new items
          await request.post('/')
            .set('Cookie', 'Dummy Cookie')
            .send(itemData);

          await request.post('/')
            .set('Cookie', 'Dummy Cookie')
            .send(itemData);

          const res = await request.get('/');
          expect(res.status).toBe(200);
          expect(res.body.length).toBe(2);
          expect(res.body[0]).toBeDefined();
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    // * NOTE: Currently unimplemented
    // describe('update multiple', () => {
    //   // * NOTE: Can require multiple checks depending on number of user permission levels
    //   // it('requires valid permissions', async (done) => {

    //   // });

    //   // * NOTE: Can require multiple checks depending on number of required fields
    //   // it('requires valid data', async (done) => {

    //   // });

    //   // * NOTE: Can require multiple checks depending on number of non-unique fields
    //   // it('blocks creation of item with non-unique field', async (done) => {

    //   // });

    //   it('catches item doesn\'t exist', async (done) => {

    //   });

    //   it('succeeds', async (done) => {

    //   });
    // });

    // ! IMPORTANT: This is commented out
    // describe('delete multiple', () => {
    //   // * NOTE: Can require multiple checks depending on number of user permission levels
    //   // it('requires valid permissions', async (done) => {

    //   // });

    //   // * NOTE: Not needed with only DELETE ALL functionality
    //   // it('catches item doesn\'t exist', async (done) => {

    //   // });

    //   it('succeeds', async (done) => {
    //     try {
    //       const res = await request.delete('/')
    //         .set('Cookie', 'Dummy Cookie');

    //       expect(res.status).toBe(200);
    //       done();
    //     } catch (error) {
    //       done(error);
    //     }
    //   });
    // });
  });
});
