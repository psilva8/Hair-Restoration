import { Data } from '@/utils/data-utils';

const mockData: Data = {
  cities: [
    { name: 'Beverly Hills', urlSlug: 'beverly-hills' },
    { name: 'West Hollywood', urlSlug: 'west-hollywood' },
    { name: 'Santa Monica', urlSlug: 'santa-monica' },
    { name: 'Los Angeles', urlSlug: 'los-angeles' },
    { name: 'Sherman Oaks', urlSlug: 'sherman-oaks' },
    { name: 'Glendale', urlSlug: 'glendale' },
    { name: 'Pasadena', urlSlug: 'pasadena' },
    { name: 'Burbank', urlSlug: 'burbank' },
    { name: 'Hollywood', urlSlug: 'hollywood' }
  ],
  businesses: {
    'beverly-hills': [
      {
        title: 'Beverly Hills Hair Restoration',
        address: '9735 Wilshire Blvd #421, Beverly Hills, CA 90212',
        rating: 4.9,
        reviewsCount: 120,
        categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
        city: 'Beverly Hills'
      },
      {
        title: 'Alvi Armani Beverly Hills',
        address: '9777 Wilshire Blvd, Beverly Hills, CA 90212',
        rating: 4.8,
        reviewsCount: 98,
        categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
        city: 'Beverly Hills'
      }
    ],
    'west-hollywood': [
      {
        title: 'WeHo Hair Clinic',
        address: '8500 Sunset Blvd, West Hollywood, CA 90069',
        rating: 4.7,
        reviewsCount: 85,
        categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
        city: 'West Hollywood'
      }
    ],
    'santa-monica': [
      {
        title: 'Santa Monica Hair Restoration',
        address: '2121 Santa Monica Blvd, Santa Monica, CA 90404',
        rating: 4.6,
        reviewsCount: 75,
        categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
        city: 'Santa Monica'
      }
    ],
    'los-angeles': [
      {
        title: 'LA Hair Clinic',
        address: '11620 Wilshire Blvd #280, Los Angeles, CA 90025',
        rating: 4.8,
        reviewsCount: 110,
        categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
        city: 'Los Angeles'
      },
      {
        title: 'US Hair Restoration',
        address: '16661 Ventura Blvd #312, Encino, CA 91436',
        rating: 4.7,
        reviewsCount: 92,
        categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
        city: 'Los Angeles'
      }
    ],
    'sherman-oaks': [
      {
        title: 'Sherman Oaks Hair Center',
        address: '4836 Van Nuys Blvd, Sherman Oaks, CA 91403',
        rating: 4.5,
        reviewsCount: 68,
        categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
        city: 'Sherman Oaks'
      }
    ],
    'glendale': [
      {
        title: 'Glendale Hair Clinic',
        address: '222 W Glenoaks Blvd, Glendale, CA 91202',
        rating: 4.6,
        reviewsCount: 72,
        categories: ['Hair Transplant', 'PRP Treatment', 'Hair Loss Treatment'],
        city: 'Glendale'
      }
    ],
    'pasadena': [
      {
        title: 'Pasadena Hair Restoration',
        address: '960 E Green St, Pasadena, CA 91106',
        rating: 4.7,
        reviewsCount: 63,
        categories: ['Hair Transplant', 'FUE', 'Hair Loss Treatment'],
        city: 'Pasadena'
      }
    ],
    'burbank': [
      {
        title: 'Burbank Hair Specialists',
        address: '2701 W Alameda Ave, Burbank, CA 91505',
        rating: 4.5,
        reviewsCount: 58,
        categories: ['Hair Transplant', 'FUT', 'Hair Restoration'],
        city: 'Burbank'
      }
    ],
    'hollywood': [
      {
        title: 'Hollywood Hair Clinic',
        address: '6464 Sunset Blvd, Hollywood, CA 90028',
        rating: 4.6,
        reviewsCount: 82,
        categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
        city: 'Hollywood'
      }
    ]
  },
  categories: {
    'beverly-hills': {
      'Hair Transplant': [
        {
          title: 'Beverly Hills Hair Restoration',
          address: '9735 Wilshire Blvd #421, Beverly Hills, CA 90212',
          rating: 4.9,
          reviewsCount: 120,
          categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
          city: 'Beverly Hills'
        },
        {
          title: 'Alvi Armani Beverly Hills',
          address: '9777 Wilshire Blvd, Beverly Hills, CA 90212',
          rating: 4.8,
          reviewsCount: 98,
          categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
          city: 'Beverly Hills'
        }
      ],
      'FUE': [
        {
          title: 'Beverly Hills Hair Restoration',
          address: '9735 Wilshire Blvd #421, Beverly Hills, CA 90212',
          rating: 4.9,
          reviewsCount: 120,
          categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
          city: 'Beverly Hills'
        },
        {
          title: 'Alvi Armani Beverly Hills',
          address: '9777 Wilshire Blvd, Beverly Hills, CA 90212',
          rating: 4.8,
          reviewsCount: 98,
          categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
          city: 'Beverly Hills'
        }
      ],
      'PRP Treatment': [
        {
          title: 'Beverly Hills Hair Restoration',
          address: '9735 Wilshire Blvd #421, Beverly Hills, CA 90212',
          rating: 4.9,
          reviewsCount: 120,
          categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
          city: 'Beverly Hills'
        }
      ],
      'Hair Restoration': [
        {
          title: 'Alvi Armani Beverly Hills',
          address: '9777 Wilshire Blvd, Beverly Hills, CA 90212',
          rating: 4.8,
          reviewsCount: 98,
          categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
          city: 'Beverly Hills'
        }
      ]
    },
    'west-hollywood': {
      'Hair Transplant': [
        {
          title: 'WeHo Hair Clinic',
          address: '8500 Sunset Blvd, West Hollywood, CA 90069',
          rating: 4.7,
          reviewsCount: 85,
          categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
          city: 'West Hollywood'
        }
      ],
      'FUT': [
        {
          title: 'WeHo Hair Clinic',
          address: '8500 Sunset Blvd, West Hollywood, CA 90069',
          rating: 4.7,
          reviewsCount: 85,
          categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
          city: 'West Hollywood'
        }
      ],
      'Hair Loss Treatment': [
        {
          title: 'WeHo Hair Clinic',
          address: '8500 Sunset Blvd, West Hollywood, CA 90069',
          rating: 4.7,
          reviewsCount: 85,
          categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
          city: 'West Hollywood'
        }
      ]
    }
  }
};

export default mockData; 