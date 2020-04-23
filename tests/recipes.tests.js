const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const token ="Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg3NjAyMTAxLCJleHAiOjE1ODc2ODg1MDF9.PfeoDYNI-RGpf0SGMnintrK7fEjBYn00KlJmE08-r5M>"; 

chai.use(chaiHttp);

describe('Recipes API Service', function () {
  it('should GET all recipes', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/recipes')
      .set('access_token', token)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single recipe', function (done) {
    const expected = [
      {
        recipe_id: 1,
        recipe_name: "toast",
        difficulty: "easy",
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/recipes/1')
      .set('access_token', token)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it('should POST a single recipe', function (done) {
    const newRecipe = {
      recipe_name: "eggs",
    };
    const expected = { message: 'Add recipe successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/recipes')
      .set('access_token', token)
      .send(newRecipe)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });


});
