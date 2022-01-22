const request = require('supertest')
let { describe, it, expect } = global;
let server = require('../index');
const db = require("../dbConnection.js");

describe("Currencies API", () =>{
  describe("Get /currencies", () =>{
    it("Should return all currencies", 
    
    async () => {
      const res = await request(server).get('/currencies');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
    });
  })
})

afterAll(() => {
  server.close();
  db.end();
});



// describe("Currencies API", () =>{
//   describe("Delete /currencies", () =>{
//     it("Should be able to delete currencies", (done) =>{
//       chai.request(server).delete("/currencies/1")
//       .end((err, resp) => {
//         expect(resp).to.have.status(200);
//         // resp.should.have.status(200);
//         // resp.body.data.should.be.a('array');
//         done()
//       })
//     })
//   })
// })