// services/mixpanelService.ts
import mixpanel from 'mixpanel-browser';

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    mixpanel.track(eventName, properties);
  } catch (error) {
    console.warn('Mixpanel tracking error:', error);
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  try {
    mixpanel.identify(userId);
    if (properties) {
      mixpanel.people.set(properties);
    }
  } catch (error) {
    console.warn('Mixpanel identify error:', error);
  }
};