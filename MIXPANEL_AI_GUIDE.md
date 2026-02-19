# Mixpanel AI Analytics Guide for Dev-Wrapped

## Overview
This guide shows you how to leverage Mixpanel's AI-powered analytics to gain deep insights into your Dev-Wrapped application usage and user behavior.

## Accessing Mixpanel AI Features

### 1. Login to Mixpanel Dashboard
- Go to: https://mixpanel.com/
- Login with your account credentials
- Select your Dev-Wrapped project

### 2. AI-Powered Features Available

#### **Lexicon AI (Natural Language Queries)**
Location: `Insights` → `Ask Lexicon`

**Example Queries You Can Ask:**
- "How many users generated reports in the last 7 days?"
- "What's the conversion rate from landing page to report generation?"
- "Which AI model has the highest success rate?"
- "What's the average time users spend on the site?"
- "Show me users who shared their reports on social media"
- "What are the most common errors users encounter?"
- "Which countries have the most active users?"
- "What's the retention rate for users who generated reports?"

#### **Spark AI (Automated Insights)**
Location: `Insights` → `Spark` tab

**What it provides:**
- Automatic anomaly detection
- Trend identification
- Significant behavior changes
- Performance alerts
- User segment insights

#### **AI-Enhanced Reports**

##### **Funnel Analysis with AI**
Location: `Funnels`

**Recommended Funnels to Create:**
1. **User Onboarding Funnel:**
   - Session Started → GitHub Username Entered → Report Generated → Report Viewed

2. **Social Sharing Funnel:**
   - Report Generated → Share Button Clicked → Social Share Completed

3. **Error Recovery Funnel:**
   - Error Occurred → User Retry → Successful Report Generation

##### **Retention Analysis with AI**
Location: `Retention`

**Key Metrics to Track:**
- Day 1, 7, 30 retention rates
- Feature-specific retention (users who used AI analysis)
- Cohort analysis by acquisition source

##### **User Flow Analysis**
Location: `Flows`

**Recommended Flows:**
- Entry point → Report generation → Exit/Share
- Error paths and recovery patterns
- Feature discovery patterns

## Key Events Being Tracked

### Core User Actions
- `Session Started` - User visits the site
- `User Journey Step` - Navigation through the app
- `Report Generated` - Successful report creation
- `AI Analysis` - AI model interactions
- `Social Share` - Social media sharing
- `Error Occurred` - Error tracking
- `Performance Metric` - App performance data

### Advanced Analytics Events
- `Funnel Step` - Conversion tracking
- `Experiment Interaction` - A/B testing
- `User Feedback` - User satisfaction
- `Feature Engagement` - Feature usage
- `Time on Page` - Engagement metrics
- `Scroll Depth` - Content consumption

## AI-Powered Insights You Can Generate

### 1. **User Behavior Analysis**
Ask Lexicon:
- "What's the typical user journey from landing to report generation?"
- "Which features are most engaging for users?"
- "What causes users to abandon the report generation process?"

### 2. **Performance Optimization**
Ask Lexicon:
- "What's the average response time for AI analysis?"
- "Which AI model performs best in terms of speed and accuracy?"
- "What are the most common performance bottlenecks?"

### 3. **Conversion Optimization**
Ask Lexicon:
- "What's the conversion rate from visitor to report generator?"
- "Which traffic sources have the highest conversion rates?"
- "What factors correlate with successful report generation?"

### 4. **Error Analysis**
Ask Lexicon:
- "What are the most common errors users encounter?"
- "How do error rates vary by browser or device?"
- "What's the success rate of error recovery attempts?"

### 5. **Social Engagement**
Ask Lexicon:
- "Which social platforms are most popular for sharing?"
- "What's the viral coefficient of shared reports?"
- "How does social sharing correlate with user retention?"

## Setting Up Custom Dashboards

### 1. **Executive Dashboard**
Create a dashboard with:
- Total users (last 30 days)
- Report generation rate
- AI analysis success rate
- Social sharing metrics
- Error rates

### 2. **Product Performance Dashboard**
Include:
- Feature adoption rates
- User flow completion rates
- Performance metrics
- A/B test results

### 3. **User Experience Dashboard**
Track:
- Session duration
- Bounce rates
- Error recovery rates
- User feedback scores

## AI-Powered Alerts

Set up intelligent alerts for:
- Sudden drops in conversion rates
- Spike in error rates
- Unusual user behavior patterns
- Performance degradation
- Significant changes in user engagement

## Advanced AI Features

### 1. **Predictive Analytics**
- Identify users likely to churn
- Predict peak usage times
- Forecast feature adoption

### 2. **Cohort Intelligence**
- AI-powered cohort segmentation
- Behavioral pattern recognition
- Lifecycle stage identification

### 3. **Anomaly Detection**
- Automatic detection of unusual patterns
- Real-time alerts for significant changes
- Root cause analysis suggestions

## Best Practices

1. **Regular AI Query Sessions**
   - Schedule weekly Lexicon AI sessions
   - Ask follow-up questions based on insights
   - Document key findings

2. **Combine Multiple AI Features**
   - Use Spark insights to inform Lexicon queries
   - Cross-reference funnel data with retention analysis
   - Validate AI suggestions with user feedback

3. **Act on AI Recommendations**
   - Implement suggested optimizations
   - Test AI-identified hypotheses
   - Monitor impact of changes

## Getting Started Checklist

- [ ] Login to Mixpanel dashboard
- [ ] Explore Lexicon AI with basic queries
- [ ] Set up key funnels (onboarding, sharing)
- [ ] Create retention analysis
- [ ] Configure Spark AI alerts
- [ ] Build executive dashboard
- [ ] Schedule regular AI insight sessions

## Sample AI Queries to Start With

1. "Show me the conversion funnel from landing page to report generation"
2. "What's the average time between session start and report generation?"
3. "Which users are most likely to share their reports?"
4. "What are the peak usage hours for the application?"
5. "How does user engagement vary by geographic location?"

Remember: Mixpanel's AI gets smarter as you use it more. The more data you have and the more questions you ask, the better insights you'll receive!