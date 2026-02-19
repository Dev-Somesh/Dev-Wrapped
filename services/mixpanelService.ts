// services/mixpanelService.ts
import mixpanel from 'mixpanel-browser';

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Add default properties for better AI analysis
    const enrichedProperties = {
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      ...properties
    };
    
    mixpanel.track(eventName, enrichedProperties);
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

// Advanced tracking utilities
export const trackTimeOnPage = (startTime: number, pageName: string, additionalProps?: Record<string, any>) => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
  trackEvent('Time on Page', {
    page_name: pageName,
    time_spent_seconds: timeSpent,
    time_spent_minutes: Math.round(timeSpent / 60 * 10) / 10, // rounded to 1 decimal
    ...additionalProps
  });
};

export const trackScrollDepth = (scrollPercentage: number, pageName: string, additionalProps?: Record<string, any>) => {
  // Only track at certain milestones to avoid spam
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => scrollPercentage >= m && scrollPercentage < m + 5);
  
  if (milestone) {
    trackEvent('Scroll Depth', {
      page_name: pageName,
      scroll_percentage: milestone,
      ...additionalProps
    });
  }
};

export const trackFeatureEngagement = (featureName: string, action: string, additionalProps?: Record<string, any>) => {
  trackEvent('Feature Engagement', {
    feature_name: featureName,
    action: action,
    timestamp: new Date().toISOString(),
    ...additionalProps
  });
};

// Session tracking
export const trackSessionStart = () => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  sessionStorage.setItem('devwrapped_session_id', sessionId);
  sessionStorage.setItem('devwrapped_session_start', Date.now().toString());
  
  trackEvent('Session Started', {
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    referrer: document.referrer || 'direct',
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`
  });
  
  return sessionId;
};

export const trackSessionEnd = (additionalProps?: Record<string, any>) => {
  const sessionId = sessionStorage.getItem('devwrapped_session_id');
  const sessionStart = sessionStorage.getItem('devwrapped_session_start');
  
  if (sessionId && sessionStart) {
    const sessionDuration = Math.round((Date.now() - parseInt(sessionStart)) / 1000);
    
    trackEvent('Session Ended', {
      session_id: sessionId,
      session_duration_seconds: sessionDuration,
      session_duration_minutes: Math.round(sessionDuration / 60 * 10) / 10,
      timestamp: new Date().toISOString(),
      ...additionalProps
    });
  }
};

// Enhanced tracking for AI-powered analytics
export const trackUserJourney = (step: string, stepData?: Record<string, any>) => {
  trackEvent('User Journey Step', {
    journey_step: step,
    step_timestamp: new Date().toISOString(),
    ...stepData
  });
};

export const trackReportGeneration = (reportType: string, success: boolean, processingTime?: number, errorDetails?: string) => {
  trackEvent('Report Generated', {
    report_type: reportType,
    success: success,
    processing_time_ms: processingTime,
    error_details: errorDetails,
    generation_timestamp: new Date().toISOString()
  });
};

export const trackAIAnalysis = (analysisType: string, model: string, success: boolean, responseTime?: number) => {
  trackEvent('AI Analysis', {
    analysis_type: analysisType,
    ai_model: model,
    success: success,
    response_time_ms: responseTime,
    analysis_timestamp: new Date().toISOString()
  });
};

export const trackSocialShare = (platform: string, contentType: string, success: boolean) => {
  trackEvent('Social Share', {
    platform: platform,
    content_type: contentType,
    success: success,
    share_timestamp: new Date().toISOString()
  });
};

export const trackErrorOccurrence = (errorType: string, errorMessage: string, context?: Record<string, any>) => {
  trackEvent('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
    error_timestamp: new Date().toISOString(),
    ...context
  });
};

export const trackPerformanceMetric = (metricName: string, value: number, unit: string, context?: Record<string, any>) => {
  trackEvent('Performance Metric', {
    metric_name: metricName,
    metric_value: value,
    metric_unit: unit,
    measurement_timestamp: new Date().toISOString(),
    ...context
  });
};

// Conversion funnel tracking
export const trackFunnelStep = (funnelName: string, stepName: string, stepNumber: number, additionalProps?: Record<string, any>) => {
  trackEvent('Funnel Step', {
    funnel_name: funnelName,
    step_name: stepName,
    step_number: stepNumber,
    step_timestamp: new Date().toISOString(),
    ...additionalProps
  });
};

// A/B test tracking
export const trackExperiment = (experimentName: string, variant: string, outcome?: string, additionalProps?: Record<string, any>) => {
  trackEvent('Experiment Interaction', {
    experiment_name: experimentName,
    variant: variant,
    outcome: outcome,
    experiment_timestamp: new Date().toISOString(),
    ...additionalProps
  });
};

// User feedback tracking
export const trackUserFeedback = (feedbackType: string, rating?: number, comment?: string, additionalProps?: Record<string, any>) => {
  trackEvent('User Feedback', {
    feedback_type: feedbackType,
    rating: rating,
    comment: comment,
    feedback_timestamp: new Date().toISOString(),
    ...additionalProps
  });
};