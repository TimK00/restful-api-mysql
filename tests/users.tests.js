// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg4MDE5NzE1LCJleHAiOjE1ODgxMDYxMTV9.MSswUfEju6e8qM6FglrWr7-sQ0Gr_naRoOl3_rJSco8';

// describe('User API service', () => {
//   it("should GET a logged in user's unique id, username, and password", (done) => {
//     const expected = [
//       {
//         user_id: 2,
//         username: 'tim',
//         email: 'tim@email.com',
//       },
//     ];

//     chai
//       .request('http://localhost:3000')
//       .get('/api/user/me')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });

//   // run one time then skip once working
//   it('should PUT updated credentials for a logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin3',
//       password: 'admin3',
//       email: 'tim@email.com',
//     };
//     const expected = { msg: 'Updated succesfully!' };

//     chai
//       .request('http://localhost:3000')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });

//   it('should not PUT updated credentials for a duplicate logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin3',
//       password: 'admin3',
//       email: 'tim@email.com',
//     };
//     const expected = { msg: 'Nothing to update...' };

//     chai
//       .request('http://localhost:3000')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });
// });
