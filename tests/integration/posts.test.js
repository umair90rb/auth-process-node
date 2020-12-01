const request = require('supertest');

let server;

describe('api/posts', ()=>{
    beforeEach(()=>{ server = require('../../index'); });
    afterEach(()=>{ server.close(); });

    describe('GET /', ()=>{
        it('should return all posts', async ()=>{
            const res = await request(server).get('/api/posts/1/5').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM1MzRiOTdmYTk1ZTE0YzRlODhiYmEiLCJpYXQiOjE2MDY4NDk4NjR9.4VyvEV6tlghaLjQB6-IMqN72zU6gHzh85OPECuKxe8M');
            expect(res.status).toBe(200);
        });
    });
});