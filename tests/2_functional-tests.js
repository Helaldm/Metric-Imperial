const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Ajusta la ruta según sea necesario

chai.use(chaiHttp);
const { expect } = chai;

describe('Functional Tests', function() {
  it('should convert a valid input like 10L', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('string');
        done();
      });
  });
  it('should return "invalid unit" for an invalid input like 32g', function(done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('error').eql('invalid unit');
        done();
      });
  });
  // Agrega más pruebas según sea necesario...
});
