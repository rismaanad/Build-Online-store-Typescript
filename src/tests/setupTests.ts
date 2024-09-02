import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const mockItem = {
    id: 1,
    adminId: 1,
    itemName: 'Mock Item',
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      item: {
        create: jest.fn().mockResolvedValue(mockItem),
        findMany: jest.fn().mockResolvedValue([mockItem]),
        update: jest.fn().mockResolvedValue({ ...mockItem, itemName: 'Updated Item' }),
        delete: jest.fn().mockResolvedValue(mockItem),
      },
      $disconnect: jest.fn(),
    })),
  };
});

beforeAll(() => {
});

afterAll(() => {
});
