import request from 'supertest';
import http from 'http';
import app from '../server';

describe('Admin API Tests', () => {
    let server: http.Server;
    let token: string;

    beforeAll((done) => {
        server = app.listen(process.env.TEST_PORT || 3001, () => {
            console.log(`Test server running on port ${process.env.TEST_PORT || 3001}`);
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should create a new admin', async () => {
        const res = await request(server)
            .post('/api/admins/register')
            .send({
                name: 'Test Admin',
                email: 'testadmin@example.com',
                password: 'password123',
            });

        console.log('Create Admin response:', res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', 'Test Admin');
    });

    it('should login an admin and return a JWT', async () => {
        const res = await request(server)
            .post('/api/admins/login')
            .send({
                email: 'testadmin@example.com',
                password: 'password123',
            });

        console.log('Login response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should fetch all admins', async () => {
        const res = await request(server)
            .get('/api/admins/')
            .set('Authorization', `Bearer ${token}`);

        console.log('Fetch All Admins response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should update an admin', async () => {
        const res = await request(server)
            .put('/api/admins/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Admin',
                email: 'updatedadmin@example.com',
                password: 'newpassword123',
            });

        console.log('Update Admin response:', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Admin');
    });

    it('should delete an admin', async () => {
        const res = await request(server)
            .delete('/api/admins/1')
            .set('Authorization', `Bearer ${token}`);

        console.log('Delete Admin response:', res.body);
        expect(res.statusCode).toEqual(204);
    });
});
