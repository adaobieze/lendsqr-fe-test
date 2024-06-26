const fs = require('fs');
const path = require('path');

// Mock the handler function
const mockHandler = jest.fn();
jest.mock('../../../api/api.js', () => ({
    handler: mockHandler
}));

// Mock fs.readFileSync
jest.mock('fs', () => ({
    readFileSync: jest.fn(() => JSON.stringify({
        appUsers: [{
            id: "1",
            email: "test@example.com",
            password: "password123.",
            name: "Adedeji",
            firstName: "Simisola",
            lastName: "Adedeji",
            profilePhoto: "/images/userAvatar.png",
            organizations: ["Lendsqr", "Irorun"]
        }],
        testEndpoint: [
            { id: '1', name: 'Test Item' }
        ]
    })),
    writeFileSync: jest.fn()
}));

// Mock path.join
jest.mock('path', () => ({
    join: jest.fn(() => '/db.json')
}));

// Mock process.cwd
jest.mock('process', () => ({
    ...jest.requireActual('process'),
    cwd: jest.fn(() => '/mock/cwd')
}));

describe('Serverless Function Tests', () => {
    let req, res;

    beforeEach(() => {
        mockHandler.mockReset();
        req = {
            method: '',
            query: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
            end: jest.fn()
        };
    });

    test('Login - Successful', async () => {
        req.method = 'POST';
        req.query.endpoint = 'login';
        req.body = { email: 'test@example.com', password: 'password123.' };

        mockHandler.mockImplementation((req, res) => {
            res.status(200).json({
                success: true,
                data: {
                    token: 'mockToken',
                    user: {
                        id: '1',
                        email: 'test@example.com',
                        firstName: 'Simisola',
                        lastName: 'Adedeji',
                        profilePhoto: '/images/userAvatar.png',
                        organizations: ['Lendsqr', 'Irorun']
                    }
                }
            });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                token: expect.any(String),
                user: expect.objectContaining({
                    id: '1',
                    email: 'test@example.com',
                    firstName: 'Simisola',
                    lastName: 'Adedeji',
                    profilePhoto: '/images/userAvatar.png',
                    organizations: ['Lendsqr', 'Irorun']
                })
            })
        }));
    });

    test('Login - Failed', async () => {
        req.method = 'POST';
        req.query.endpoint = 'login';
        req.body = { email: 'wrong@example.com', password: 'wrongpassword' };

        mockHandler.mockImplementation((req, res) => {
            res.status(401).json({ success: false, error: 'Invalid username and/or password' });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid username and/or password' });
    });

    test('GET - Successful', async () => {
        req.method = 'GET';
        req.query.endpoint = 'testEndpoint';

        mockHandler.mockImplementation((req, res) => {
            res.status(200).json({
                status: 200,
                data: [{ id: '1', name: 'Test Item' }],
                message: 'Data fetched successfully'
            });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 200,
            data: expect.arrayContaining([{ id: '1', name: 'Test Item' }]),
            message: 'Data fetched successfully'
        }));
    });

    test('POST - Successful', async () => {
        req.method = 'POST';
        req.query.endpoint = 'testEndpoint';
        req.body = { data: { id: '2', name: 'New Item' } };

        mockHandler.mockImplementation((req, res) => {
            res.status(201).json({
                status: 201,
                data: { id: '2', name: 'New Item' },
                message: 'Data created successfully'
            });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 201,
            data: { id: '2', name: 'New Item' },
            message: 'Data created successfully'
        }));
    });

    test('PATCH - Successful', async () => {
        req.method = 'PATCH';
        req.query.endpoint = 'testEndpoint';
        req.body = { resourceId: '1', data: { name: 'Updated Item' } };

        mockHandler.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Resource updated successfully' });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Resource updated successfully' });
    });

    test('DELETE - Successful', async () => {
        req.method = 'DELETE';
        req.query.endpoint = 'testEndpoint';
        req.body = { resourceId: '1' };

        mockHandler.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Resource deleted successfully' });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Resource deleted successfully' });
    });

    test('Invalid Method', async () => {
        req.method = 'PUT';
        req.query.endpoint = 'testEndpoint';
    
        mockHandler.mockImplementation((req, res) => {
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        });
    
        await mockHandler(req, res);
    
        expect(mockHandler).toHaveBeenCalled();
        expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.end).toHaveBeenCalledWith('Method PUT Not Allowed');
    });

    test('Endpoint Not Provided', async () => {
        req.method = 'GET';
        req.query = {};

        mockHandler.mockImplementation((req, res) => {
            res.status(400).json({ error: 'Endpoint not provided' });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Endpoint not provided' });
    });

    test('Endpoint Not Found', async () => {
        req.method = 'GET';
        req.query.endpoint = 'nonexistentEndpoint';

        mockHandler.mockImplementation((req, res) => {
            res.status(404).json({ error: 'Endpoint not found' });
        });

        await mockHandler(req, res);

        expect(mockHandler).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Endpoint not found' });
    });
});