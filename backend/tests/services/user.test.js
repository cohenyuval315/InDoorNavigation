// import mongoose from "mongoose";
// import request from "supertest";
// import app from "../app";

// require("dotenv").config();

// /* Connecting to the database before each test. */
// beforeEach(async () => {
//     await mongoose.connect(process.env.MONGODB_URI);
//   });
  
//   /* Closing database connection after each test. */
//   afterEach(async () => {
//     await mongoose.connection.close();
//   });


//   describe("GET /api/products", () => {
//     it("should return all products", async () => {
//       const res = await request(app).get("/api/products");
//       expect(res.statusCode).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
//   });