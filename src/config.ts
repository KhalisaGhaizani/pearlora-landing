// Site-wide settings. Edit here, not in the components.

// TODO before launch: replace with the real contact address.
export const CONTACT_EMAIL = 'hello@example.com';

export const SITE = {
  name: 'Pearlora',
  title: 'Pearlora | Climate-adaptive depth management for pearl oyster farms',
  description:
    'Pearlora senses the water column, recommends a safer depth, moves your oyster baskets with operator approval, and verifies the result. Now seeking pilot farms.',
};

export const DEMO_MAILTO =
  `mailto:${CONTACT_EMAIL}` +
  `?subject=${encodeURIComponent('Pearlora pilot enquiry')}` +
  `&body=${encodeURIComponent(
    'Farm name:\nLocation:\nNumber of longlines:\nWhat we would like to see:\n',
  )}`;

// Indicative figures from the pitch deck; to be validated with pilot farms.
export const PRICING = [
  {
    name: 'Hardware lease',
    price: 'Rp7M',
    unit: 'per deployment / month',
    detail: 'Control pontoon, winch line-set, water-profile sensor and verification node, installed on your existing longline.',
  },
  {
    name: 'Platform subscription',
    price: 'Rp5M',
    unit: 'per productive hectare / month',
    detail: 'Dashboard, depth recommendations, alerts, intervention log and maintenance advisories.',
  },
  {
    name: 'Setup',
    price: 'Rp15M',
    unit: 'one-time, per new deployment',
    detail: 'Site survey, installation, sensor calibration and operator training.',
  },
];
