const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Asegúrate de que la ruta a tu servidor sea correcta

chai.use(chaiHttp);
const { expect } = chai;

describe('API Convert', () => {
  
  // Prueba para entrada válida
  it('Convierte una entrada válida como 10L', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('string');
        expect(res.body.string).to.include('litros');
        done();
      });
  });

  // Prueba para entrada inválida
  it('Convierte una entrada inválida como 32g', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // Prueba para número inválido
  it('Convierte un número inválido como 3/7.2/4kg', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // Prueba para número y unidad no válidos
  it('Convierte un número y una unidad no válidos como 3/7.2/4kilomegagram', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // Prueba para conversión sin número
  it('Convierte sin número tal como kg', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

});
