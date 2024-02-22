// import request from 'supertest';
// import app from './app';

// describe('User API', () => {
//     describe('GET /api/users/:userId', () => {
//       test('It should respond with user information', async () => {
//         // Mock the behavior of your route handler
//         const mockUser = {
//           id: '123',
//           name: 'John Doe',
//           email: 'john@example.com'
//         };
  
//         // Mock the behavior of your database or data source
//         const mockDatabaseQuery = jest.fn().mockResolvedValue(mockUser);
  
//         // Mock the Express route handler to use the mocked database query
//         jest.mock('./your-database-module', () => ({
//           getUserById: mockDatabaseQuery
//         }));
  
//         // Now make the request to the route handler without starting the server
//         const response = await request(app).get('/api/users/123');
  
//         // Assertions
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(mockUser);
//       });
  
//       test('It should respond with 404 if user is not found', async () => {
//         // Mock the behavior of your database or data source
//         const mockDatabaseQuery = jest.fn().mockResolvedValue(null);
  
//         // Mock the Express route handler to use the mocked database query
//         jest.mock('./your-database-module', () => ({
//           getUserById: mockDatabaseQuery
//         }));
  
//         // Now make the request to the route handler without starting the server
//         const response = await request(app).get('/api/users/nonexistent');
  
//         // Assertions
//         expect(response.status).toBe(404);
//       });
//     });
//   });