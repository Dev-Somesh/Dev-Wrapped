# Mixpanel AI Quick Start for Dev-Wrapped

## 🚀 Immediate Actions (5 minutes)

### 1. Login & Explore
- Go to: https://mixpanel.com/
- Login and select your Dev-Wrapped project
- You should see data flowing in from your app

### 2. Try Lexicon AI Right Now
Click `Insights` → `Ask Lexicon` and try these queries:

```
"How many users visited in the last 24 hours?"
"What's the success rate of report generation?"
"Show me the most popular GitHub usernames analyzed"
"Which social platforms are used most for sharing?"
"What's the average processing time for AI analysis?"
```

### 3. Set Up Key Funnels (2 minutes each)
Go to `Funnels` and create:

**Funnel 1: User Conversion**
- Step 1: `Session Started`
- Step 2: `Launch AI` 
- Step 3: `AI Response Sent`
- Step 4: `Social Share`

**Funnel 2: Error Recovery**
- Step 1: `API Error`
- Step 2: `Analysis Restarted`
- Step 3: `AI Response Sent`

### 4. Create Executive Dashboard
Go to `Dashboards` → `Create Dashboard` → "Dev-Wrapped Executive"

Add these charts:
- **Total Users** (last 30 days)
- **Report Generation Rate** (conversion funnel)
- **AI Success Rate** (AI Response Sent / Launch AI)
- **Social Sharing Rate** (Social Share / AI Response Sent)
- **Error Rate** (API Error events)
- **Average Session Duration**

## 🎯 Key Metrics You're Already Tracking

Your app is sending rich data to Mixpanel:

### Core Events
- `Session Started` - Every user visit
- `Launch AI` - When analysis begins
- `AI Response Sent` - Successful AI analysis
- `Social Share` - When users share results
- `API Error` - Any errors that occur
- `External Link Clicked` - Link tracking
- `Page View` - Page navigation

### User Properties
- GitHub username
- Analysis year
- Device/browser info
- Geographic location
- Session duration

## 🤖 AI Insights You Can Get

### Performance Analysis
Ask Lexicon:
- "What's the average response time for Gemini AI analysis?"
- "Which users have the longest session durations?"
- "What's the error rate by hour of day?"

### User Behavior
Ask Lexicon:
- "How do users navigate through the app?"
- "What causes users to abandon the analysis?"
- "Which features are most engaging?"

### Business Intelligence
Ask Lexicon:
- "What's the viral coefficient of shared reports?"
- "Which traffic sources convert best?"
- "How does usage vary by day of week?"

## 📈 Advanced Features to Explore

### 1. Cohort Analysis
- Go to `Users` → `Cohorts`
- Create cohorts based on:
  - First analysis date
  - Successful vs failed analyses
  - Social sharers vs non-sharers

### 2. A/B Testing Setup
- Use `Experiments` to test:
  - Different AI models
  - UI variations
  - Onboarding flows

### 3. Automated Alerts
Set up alerts for:
- Sudden drop in conversion rate
- Spike in error rates
- Unusual user behavior patterns

## 🎨 Sample Dashboard Widgets

### Widget 1: Real-time Activity
- Chart Type: Line Chart
- Event: `Session Started`
- Time Range: Last 24 hours
- Breakdown: By hour

### Widget 2: AI Success Rate
- Chart Type: Formula
- Formula: `AI Response Sent` / `Launch AI` * 100
- Time Range: Last 7 days

### Widget 3: Top GitHub Users
- Chart Type: Table
- Event: `AI Response Sent`
- Group by: `user_id` property
- Show: Top 10

### Widget 4: Error Analysis
- Chart Type: Bar Chart
- Event: `API Error`
- Group by: `error_type` property

## 🔥 Pro Tips

1. **Use Lexicon Daily**: Ask 3-5 questions every day to discover insights
2. **Set Up Slack Alerts**: Get notified of important changes
3. **Create User Segments**: Group users by behavior patterns
4. **Monitor Funnels**: Track conversion rates daily
5. **Use Spark AI**: Let it automatically find anomalies

## 📱 Mobile App
Download the Mixpanel mobile app to monitor your metrics on the go!

---

**Your Mixpanel project is already collecting rich data. Start exploring now!** 🚀