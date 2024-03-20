// Import the necessary modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Adjust the path to where your Express app is exported
const { expect } = chai;

// Use chaiHttp for making HTTP requests
chai.use(chaiHttp);

// Declare token and user_id in a broader scope
let token, user_id;

describe('Inquiry System', () => {
    before(done => {
        chai.request(server)
            .post('/login')
            .send({ email: "jackson@admin.com", password: '-----' })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                token = res.body.token;
                user_id = res.body.user._id;
                done();
            });
    });

    describe('POST /admin/rooms', () => {
        it('should create a room', done => {
            const roomData = {
                name: 'Deluxe Suite Plus',
                price: 300,
                maxOccupancy: 2,
                pricePerNight: 300,
                description: 'A luxurious room with a beautiful sea view.',
                amenities: ['WiFi', 'TV', 'Mini Bar']
            };

            chai.request(server)
                .post('/admin/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send(roomData)
                .end((err, res) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    // Example assertion
                    expect(res).to.have.status(201);
                    // Add more assertions as needed
                    done();
                });
        });
    });
});
