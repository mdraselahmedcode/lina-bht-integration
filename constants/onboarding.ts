// constants/onboarding.ts
export const GRADIENT_CONFIG = {
  colors: [
    'rgba(232, 221, 208, 0)',
    'rgba(232, 221, 208, 0.32)',
    'rgba(232, 221, 208, 0.64)',
    'rgba(232, 221, 208, 0.76)',
    '#E8DDD0',
    '#E8DDD0',
  ] as const,
  locations: [0, 0.1331, 0.2455, 0.3743, 0.4867, 1] as const,
  start: { x: 0.5, y: 0 } as const,
  end: { x: 0.5, y: 1 } as const,
};

export const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Ai Powered Skin Care',
    description: 'AI helps you build healthier screen habits every day.',
    backgroundImage: require('@/assets/images/onboarding/onboarding_1.png'),
    buttonText: 'Get Started',
  },
  {
    id: '2',
    title: 'Get Your Personalized Routiner',
    description: 'Smart reminders and brightness control reduce eye strain.',
    backgroundImage: require('@/assets/images/onboarding/onboarding_2.png'),
    buttonText: 'Continue',
  },
  {
    id: '3',
    title: 'Product That Match Your Budget',
    description: 'See your screen time and get AI tips to stay balanced.',
    backgroundImage: require('@/assets/images/onboarding/onboarding_3.png'),
    buttonText: 'Get Started',
  },
];

export const SCREEN_MAP = {
  '/(onboarding)/screen1': 0,
  '/(onboarding)/screen2': 1,
  '/(onboarding)/screen3': 2,
};