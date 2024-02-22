import supertest from 'supertest';
import app from '../app';

describe('User API', () => {

    // beforeAll(() => {
    // //   server = app.listen(testPort, () => {
    // //     console.log(`Test server running on port ${testPort}\n base url = ${base_url}`);
    // //   });
    // });
  
    afterAll((done) => {
      app.close(done);
    });
  
    describe('GET /buildings', () => {
      test('It should respond with buildings data', async () => {
        const response = await supertest(app).get(`/buildings`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('buildings');
      });
    });


  });