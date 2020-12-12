const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');

request_user_id = 1;

const token = generateAccessToken(request_user_id, {
      expiresIn: 86400,
});

describe('Estimates API Service', function () {
  it.skip('user does not have estimates', function (done) {
    const expected = { msg: 'No estimates available for this user.' }

    chai
      .request('http://localhost:3000')
      .get('/api/estimates')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it.skip('should POST a single estimate', function (done) {
    const newEstimate = {
        estimate_id: 1,
        job_number: 1,
        pipe_size: 1,
        total_num_holes: 500,
        total_savings: 200
    };
    const expected = { msg: 'Added estimate successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/estimates')
      .set('Authorization', `Bearer ${token}`)
      .send(newEstimate)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
  
  it.skip('should GET all estimates', function (done) {
      chai
        .request('http://localhost:3000')
        .get('/api/estimates')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.a('array');
          expect(resp.body.length).to.not.be.eql(0);
          done();
        });
    });

    it.skip('should GET a single estimate', function (done) {
      const expected = [
        {
            estimate_id: 1,
            job_number: 1,
            pipe_size: 1,
            total_num_holes: 500,
            user_id: 1,
            total_savings: 200
        },
      ];
  
      chai
        .request('http://localhost:3000')
        .get('/api/estimates/1')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.a('array');
          expect(resp.body.length).to.not.be.eql(0);
          expect(resp.body).to.be.eql(expected);
          done();
        });
    });

  

  });