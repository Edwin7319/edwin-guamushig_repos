import { OrganizationEntity } from '../entity/organization.entity';

export const DATA = {
  organization: {
    entity: OrganizationEntity,
    data: [
      {
        id: 1,
        name: 'Organization 1',
        status: 1,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Organization 2',
        status: 1,
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
};
