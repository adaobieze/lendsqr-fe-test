import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import handler from '../../api/api-routes';

jest.mock('fs');

describe('API handler', () => {

    const mockDbData = { status: 200, data: [{ id: 1, name: 'Test Data', }], message: 'Data fetched successfully' };

    beforeEach(() => {
        const mockDbData = {
            status: 200,
            data: [{ id: 1, name: 'Test Data' }],
            message: 'Data fetched successfully'
        };
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockDbData));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    const createMockReq = (method: string, query: any, body?: any): NextApiRequest => {
        return {
            method,
            query,
            body,
        } as unknown as NextApiRequest;
    };

    const createMockRes = (): NextApiResponse => {
        return {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as NextApiResponse;
    };

    it('should return 400 if no endpoint is provided', async () => {
        const req = createMockReq('GET', {});
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Endpoint not provided' });
    });

    it('should fetch data correctly for a valid endpoint', async () => {
        const req = createMockReq('GET', { endpoint: 'data' });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDbData);
    });

    it('should create data correctly', async () => {
        const req = createMockReq('POST', { endpoint: 'data' }, { data: { id: 2, name: 'New Data' } });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            data: { id: 2, name: 'New Data' },
            message: 'Data created successfully',
        });
    });

    it('should update data correctly', async () => {
        const req = createMockReq('PATCH', { endpoint: 'data' }, { resourceId: 1, data: { name: 'Updated Data' } });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Resource updated successfully' });
    });

    it('should delete data correctly', async () => {
        const req = createMockReq('DELETE', { endpoint: 'data' }, { resourceId: 1 });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Resource deleted successfully' });
    });

    it('should return 404 if endpoint does not exist', async () => {
        const req = createMockReq('GET', { endpoint: 'nonexistentEndpoint' });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Endpoint not found' });
    });

    it('should return 405 for unsupported HTTP method', async () => {
        const req = createMockReq('PUT', { endpoint: 'data' });
        const res = createMockRes();
        res.setHeader = jest.fn();
        res.end = jest.fn();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        expect(res.end).toHaveBeenCalledWith('Method PUT Not Allowed');
    });

    it('should return 500 if there is an error reading the file', async () => {
        (fs.readFileSync as jest.Mock).mockImplementation(() => {
            throw new Error('File read error');
        });
        const req = createMockReq('GET', { endpoint: 'data' });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it('should return 404 when trying to update non-existent resource', async () => {
        const req = createMockReq('PATCH', { endpoint: 'data' }, { resourceId: 999, data: { name: 'Updated Data' } });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Resource not found' });
    });

    it('should return 404 when trying to delete non-existent resource', async () => {
        const req = createMockReq('DELETE', { endpoint: 'data' }, { resourceId: 999 });
        const res = createMockRes();

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Resource not found' });
    });
});