export const threads = [
    {
      id: 'thread1',
      title: 'React Discussion',
      createdAt: '2025-04-10T14:35:00Z',
      creatorId: 'user1',
      participantIds: ['user1', 'user2', 'user3'],
      seriesId: 'react-series',
      reelIds: ['react-ep1', 'react-ep2'],
      messages: [
        {
          id: 'msg1',
          userId: 'user1',
          content: 'That part about React hooks was amazing!',
          timestamp: '2025-04-10T14:35:00Z',
          reelId: 'react-ep1',
          timeInReel: '01:45',
        },
        {
          id: 'msg2',
          userId: 'user3',
          content: 'Check this part about useEffect!',
          timestamp: '2025-04-10T15:10:00Z',
          reelId: 'react-ep2',
          timeInReel: '00:52',
        },
      ],
    },
  ];
  