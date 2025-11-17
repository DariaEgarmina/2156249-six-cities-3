import { nanoid } from 'nanoid';
import { Reviews } from '../types/review';

export const AVATAR_URL = 'https://i.pravatar.cc/128';

export const reviews: Reviews = [
  {
    id: nanoid(),
    date: '2024-01-15T10:30:00.000Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: nanoid(),
    date: '2024-01-10T14:45:00.000Z',
    user: {
      name: 'Sophie Martinez',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment:
      'Amazing location! The apartment was clean, modern and had everything we needed for a comfortable stay.',
    rating: 5,
  },
  {
    id: nanoid(),
    date: '2024-01-08T09:15:00.000Z',
    user: {
      name: 'Thomas Johnson',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment:
      'Good value for money. The host was very responsive and helpful. Would recommend for short stays.',
    rating: 3,
  },
  {
    id: nanoid(),
    date: '2024-01-05T16:20:00.000Z',
    user: {
      name: 'Emma Wilson',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment:
      'Beautiful apartment with stunning views. The interior design is impeccable and the neighborhood is very quiet.',
    rating: 5,
  },
  {
    id: nanoid(),
    date: '2024-01-02T11:00:00.000Z',
    user: {
      name: 'Michael Brown',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment:
      'The apartment was nice but the Wi-Fi was quite slow. Otherwise, everything was as described in the listing.',
    rating: 4,
  },
];
