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

describe('User API service', () => {
 it.skip("should GET a logged in user's unique id, username, and password", (done) => {
    const expected = [
        {
          user_id: 1,
          username: 'admin',
          email: 'admin@example.com',
        },
      ];

    chai
      .request('http://localhost:3000')
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
 
  // run one time then skip once working
  it.skip('should PUT updated credentials for a logged in user', (done) => {
    const updatedUser = {
      username: 'admin2',
      password: 'newPassword',
      email: 'admin@example.com',
    };
    const expected = { msg: 'Updated succesfully!' };

    chai
      .request('http://localhost:3000')
      .put('/api/user/me/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it.skip('should not PUT  credentials for a logged in user', (done) => {
    const updatedUser = {
      username: 'admin2',
      password: 'newPassword',
      email: 'admin@example.com',
    };
    const expected = { msg: 'Nothing to update...' };

    chai
      .request('http://localhost:3000')
      .put('/api/user/me/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});
