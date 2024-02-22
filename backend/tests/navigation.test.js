// // userService.test.js

// const UserService = require('./userService');

// describe('UserService', () => {
//   let mockDatabase;
//   let userService;

//   beforeEach(() => {
//     // Create a mock database object with CRUD methods
//     mockDatabase = {
//       insert: jest.fn(),
//       findOne: jest.fn(),
//       update: jest.fn(),
//       delete: jest.fn()
//     };
//     userService = new UserService(mockDatabase);
//   });

//   test('createUser should insert a user into the database', async () => {
//     const user = { id: '123', name: 'John Doe' };
//     mockDatabase.insert.mockResolvedValueOnce(user);

//     const result = await userService.createUser(user);

//     expect(mockDatabase.insert).toHaveBeenCalledWith(user);
//     expect(result).toEqual(user);
//   });

//   test('getUser should retrieve a user from the database', async () => {
//     const user = { id: '123', name: 'John Doe' };
//     mockDatabase.findOne.mockResolvedValueOnce(user);

//     const result = await userService.getUser('123');

//     expect(mockDatabase.findOne).toHaveBeenCalledWith('123');
//     expect(result).toEqual(user);
//   });

//   // Similar tests for updateUser and deleteUser methods
// });
