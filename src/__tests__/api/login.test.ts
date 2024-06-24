import { createMocks } from 'node-mocks-http';
import handler from '../../../api/login';
import fs from 'fs';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('Login Handler', () => {
    const mockUsers = [
        {
            id: 1,
            email: 'test@example.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            profilePhoto: 'photo.jpg'
        }
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ appUsers: mockUsers }));
        (path.join as jest.Mock).mockReturnValue('/mock/path/db.json');
    });

    it('should return 405 for non-POST requests', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(res._getJSONData()).toEqual({ success: false, error: 'Method Not Allowed' });
    });

    it('should return 401 for invalid credentials', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'wrong@example.com',
                password: 'wrongpassword'
            }
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(401);
        expect(res._getJSONData()).toEqual({ success: false, error: 'Invalid username and/or password' });
    });

    it('should return 200 with user data and token for valid credentials', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        });

        const originalDateNow = Date.now;
        Date.now = jest.fn(() => 1234567890000);

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const jsonData = res._getJSONData();
        expect(jsonData.success).toBe(true);
        expect(jsonData.data).toHaveProperty('token');
        expect(jsonData.data.user).toEqual({
            id: 1,
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            profilePhoto: 'photo.jpg'
        });

        const expectedToken = Buffer.from(`test@example.com:1234567890000`).toString('base64');
        expect(jsonData.data.token).toBe(expectedToken);

        Date.now = originalDateNow;
    });

    it('should read from the correct file path', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        });

        await handler(req, res);

        expect(path.join).toHaveBeenCalledWith(expect.any(String), 'db.json');
        expect(fs.readFileSync).toHaveBeenCalledWith('/mock/path/db.json', 'utf-8');
    });
});