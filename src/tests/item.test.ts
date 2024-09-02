import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController';

jest.mock('@prisma/client');
const prisma = new PrismaClient();

describe('Item Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    json = jest.fn();
    status = jest.fn().mockReturnValue({ json });
    mockRequest = {
      body: { adminId: 1, itemName: 'Test Item' },
      params: { id: '1' },
    };
    mockResponse = { status, json } as Partial<Response>;
  });

  it('should create a new item', async () => {
    await createItem(mockRequest as Request, mockResponse as Response);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      id: 1,
      adminId: 1,
      itemName: 'Mock Item',
    });
  });

  it('should fetch all items', async () => {
    await getItems(mockRequest as Request, mockResponse as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith([{ id: 1, adminId: 1, itemName: 'Mock Item' }]);
  });

  it('should update an item', async () => {
    mockRequest = {
      ...mockRequest,
      body: { itemName: 'Updated Item' },
    };
    await updateItem(mockRequest as Request, mockResponse as Response);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      id: 1,
      adminId: 1,
      itemName: 'Updated Item',
    });
  });

  it('should delete an item', async () => {
    await deleteItem(mockRequest as Request, mockResponse as Response);

    expect(status).toHaveBeenCalledWith(204);
    expect(json).not.toHaveBeenCalled();
  });
});
