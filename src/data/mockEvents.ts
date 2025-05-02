
import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'HackTech 2025',
    description: 'Join us for a 48-hour hackathon where students from across the country compete to build innovative solutions to real-world problems. Prizes include cash awards, internship opportunities, and mentorship from industry leaders.',
    type: 'hackathon',
    startDate: '2025-03-15T18:00:00Z',
    endDate: '2025-03-17T18:00:00Z',
    location: {
      venue: 'Engineering Building',
      college: 'MIT',
      city: 'Cambridge',
      state: 'MA',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/hacktech',
    organizer: 'MIT Tech Club',
    tags: ['coding', 'innovation', 'technology', 'competition']
  },
  {
    id: '2',
    name: 'AI Ethics Workshop',
    description: 'A comprehensive workshop on the ethical implications of artificial intelligence. Learn about bias in algorithms, privacy concerns, and responsible AI development from leading researchers in the field.',
    type: 'workshop',
    startDate: '2025-02-20T15:00:00Z',
    endDate: '2025-02-20T18:00:00Z',
    location: {
      venue: 'Computer Science Department',
      college: 'Stanford University',
      city: 'Palo Alto',
      state: 'CA',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/ai-ethics',
    organizer: 'Stanford AI Group',
    tags: ['artificial intelligence', 'ethics', 'technology', 'workshop']
  },
  {
    id: '3',
    name: 'Future of Web Development',
    description: 'A tech talk featuring industry experts discussing emerging web technologies, best practices, and career opportunities in web development.',
    type: 'tech talk',
    startDate: '2025-02-28T17:30:00Z',
    endDate: '2025-02-28T19:30:00Z',
    location: {
      venue: 'Online',
      college: 'University of Washington',
      city: 'Seattle',
      state: 'WA',
      virtual: true
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/web-dev-talk',
    organizer: 'UW Developer Community',
    tags: ['web development', 'career', 'industry', 'technology']
  },
  {
    id: '4',
    name: 'Spring Tech Career Fair',
    description: 'Connect with over 50 tech companies hiring for internships and full-time positions. Bring your resume and prepare to network with recruiters from major tech firms and exciting startups.',
    type: 'career fair',
    startDate: '2025-04-05T10:00:00Z',
    endDate: '2025-04-05T16:00:00Z',
    location: {
      venue: 'Student Union',
      college: 'UC Berkeley',
      city: 'Berkeley',
      state: 'CA',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/career-fair',
    organizer: 'Berkeley Career Center',
    tags: ['career', 'networking', 'internship', 'jobs']
  },
  {
    id: '5',
    name: 'Blockchain Development Workshop',
    description: 'A hands-on workshop where participants will learn the fundamentals of blockchain technology and build their first decentralized application.',
    type: 'workshop',
    startDate: '2025-03-10T13:00:00Z',
    endDate: '2025-03-10T17:00:00Z',
    location: {
      venue: 'Innovation Lab',
      college: 'Cornell University',
      city: 'Ithaca',
      state: 'NY',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/blockchain-workshop',
    organizer: 'Cornell Blockchain Club',
    tags: ['blockchain', 'development', 'cryptocurrency', 'workshop']
  },
  {
    id: '6',
    name: 'Women in Tech Summit',
    description: 'An inspiring event featuring keynote speeches, panel discussions, and networking opportunities, focused on supporting and celebrating women in technology fields.',
    type: 'tech talk',
    startDate: '2025-03-25T09:00:00Z',
    endDate: '2025-03-25T17:00:00Z',
    location: {
      venue: 'Conference Center',
      college: 'Georgia Tech',
      city: 'Atlanta',
      state: 'GA',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/women-in-tech',
    organizer: 'Women in CS Association',
    tags: ['diversity', 'inclusion', 'women in tech', 'networking']
  },
  {
    id: '7',
    name: 'Mobile App Hackathon',
    description: 'A 24-hour event focused on mobile app development. Participants will work in teams to create innovative mobile applications addressing real-world challenges.',
    type: 'hackathon',
    startDate: '2025-04-15T09:00:00Z',
    endDate: '2025-04-16T09:00:00Z',
    location: {
      venue: 'Tech Hub',
      college: 'University of Michigan',
      city: 'Ann Arbor',
      state: 'MI',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/mobile-hackathon',
    organizer: 'Michigan Mobile Developers',
    tags: ['mobile', 'app development', 'hackathon', 'iOS', 'Android']
  },
  {
    id: '8',
    name: 'Cybersecurity Bootcamp',
    description: 'An intensive weekend bootcamp covering essential cybersecurity concepts, common vulnerabilities, and defensive techniques. Perfect for beginners wanting to enter the field.',
    type: 'workshop',
    startDate: '2025-05-01T10:00:00Z',
    endDate: '2025-05-03T18:00:00Z',
    location: {
      venue: 'Security Research Center',
      college: 'Carnegie Mellon University',
      city: 'Pittsburgh',
      state: 'PA',
      virtual: false
    },
    imageUrl: '/placeholder.svg',
    registrationLink: 'https://example.com/register/security-bootcamp',
    organizer: 'CMU Security Club',
    tags: ['cybersecurity', 'network security', 'bootcamp', 'hacking']
  }
];
