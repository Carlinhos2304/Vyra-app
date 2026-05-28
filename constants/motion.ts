import { Easing } from 'react-native';

export const MOTION = {
  // Curves
  curves: {
    // Apple-inspired smooth out
    premiumEaseOut: Easing.bezier(0.25, 1, 0.5, 1),
    // Linear-inspired uniform acceleration
    calmEaseInOut: Easing.bezier(0.33, 0, 0.67, 1),
    // Fast acceleration, sudden decelerate
    panelExit: Easing.bezier(0.4, 0, 1, 1),
  },

  // Timings (in milliseconds)
  timings: {
    instant: 100,
    micro: 180,
    subtle: 280,
    panel: 380,
    stagger: 45,
  },

  // Spring Configs for Native Driver (Mass, Stiffness, Damping)
  springs: {
    interactiveCard: {
      stiffness: 300,
      damping: 25,
      mass: 1,
    },
    bottomSheet: {
      stiffness: 220,
      damping: 28,
      mass: 1.2,
    },
  },
};