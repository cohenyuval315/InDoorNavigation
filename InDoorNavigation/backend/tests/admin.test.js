// import app from '../app';

// describe('User API', () => {
//     let server;
  
//     beforeAll(() => {
//       server = app.listen(4000);
//     });
  
//     afterAll((done) => {
//       server.close(done);
//     });
  
//     describe('GET /api/users/:userId', () => {
//       test('It should respond with user information', async () => {
//         const userId = '123';
//         const response = await request(app).get(`/api/users/${userId}`);
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({
//           id: userId,
//           name: 'John Doe',
//           email: 'john@example.com'
//         });
//       });
  
//       test('It should respond with 404 if user is not found', async () => {
//         const userId = 'nonexistent';
//         const response = await request(app).get(`/api/users/${userId}`);
//         expect(response.status).toBe(404);
//       });
//     });
//   });