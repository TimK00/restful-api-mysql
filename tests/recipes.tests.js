const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg4MDE5NzE1LCJleHAiOjE1ODgxMDYxMTV9.MSswUfEju6e8qM6FglrWr7-sQ0Gr_naRoOl3_rJSco8"; 

chai.use(chaiHttp);

describe('Recipes API Service', function () {
  it('should GET all recipes', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
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
        recipe_name: "eggs",
        difficulty: "easy",
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/recipes/1')
      .set('Authorization', `Bearer ${token}`)
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
      recipe_name: "rice",
      difficulty: "easy"
    };
    const expected = { message: 'Added recipe successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send(newRecipe)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });


});
