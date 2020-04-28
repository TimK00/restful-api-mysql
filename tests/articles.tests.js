const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg4MDE5NzE1LCJleHAiOjE1ODgxMDYxMTV9.MSswUfEju6e8qM6FglrWr7-sQ0Gr_naRoOl3_rJSco8"; 

chai.use(chaiHttp);

describe('Articles API Service', function () {
  it('should GET all articles', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/articles')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single article', function (done) {
    const expected = [
      {
        article_id: 1,
        article_name: "1st article",
        author: "a girl",
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/api/articles/1')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it('should POST a single article', function (done) {
    const newArticle = {
      article_name: "2nd article",
      author: "a guy"
    };
    const expected = { message: 'Added article successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(newArticle)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });


});
