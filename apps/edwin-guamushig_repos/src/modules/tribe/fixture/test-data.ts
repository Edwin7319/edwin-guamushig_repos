import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { TribeEntity } from '../entity/tribe.entity';

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
  tribe: {
    entity: TribeEntity,
    data: [
      {
        id: 1,
        name: 'Tribe 1',
        status: 1,
        organization: {
          id: 1,
        },
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Tribe 2',
        status: 1,
        organization: {
          id: 2,
        },
        createdAt: new Date('2021-02-01T00:00:00.000Z'),
        updatedAt: new Date('2021-02-01T00:00:00.000Z'),
      },
    ],
  },
};
