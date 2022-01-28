const app = require('../server');
const chai = require("chai");
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


describe('Task APIs', () => {

    describe("Test GET route /api/character", () => {
        it("It should return all character", (done) => {
            chai.request(app)
                .get("/api/character")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data')
                done();
                });
        });
    });

    describe("Test GET route /api/character/:id", () => {
        it("It should return a character", (done) => {
            chai.request(app)
                .get("/api/character/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.have.property('name')
                    response.body.data.name.should.be.a('string')
                done();
                });
        });
    });

});

//https://www.chaijs.com/guide/styles/#should
