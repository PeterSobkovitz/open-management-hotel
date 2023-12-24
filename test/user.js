const chai=require('chai');
const chaiHttp=require("chai-http");
const server=require('../server');
const should =chai.should();

chai.use(chaiHttp);
describe('/POST register', () => {
    it('it should register a user', (done) => {
        let user = {
            email: "test@example9.com",
            password: "password123"
        }
        chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
                if (err) console.error('Error:', err.message);
                console.log(res.body)
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });
});