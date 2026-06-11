# 🤝 Contributing to DevWrapped 2025

<div align="center">
  <h1>🎬 Welcome Contributors!</h1>
  <p><em>Help us make DevWrapped 2025 even better</em></p>
  
  ![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-brightgreen?style=flat-square)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
  ![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4?style=flat-square)
</div>

---

## 🎯 How to Contribute

We love contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, your help is appreciated.

### 🚀 Quick Start for Contributors

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/Dev-Wrapped.git
   cd Dev-Wrapped
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   
   # Start development server
   npm run dev:netlify
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   # or
   git checkout -b fix/bug-description
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow our coding standards
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   # Use conventional commit format (see below)
   ```

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-amazing-feature
   # Then create a PR on GitHub
   ```

---

## 📝 Contribution Guidelines

### 🎨 Types of Contributions

#### **🐛 Bug Fixes**
- Fix existing functionality that isn't working correctly
- Improve error handling and edge cases
- Resolve mobile compatibility issues
- Fix performance problems

#### **✨ New Features**
- Add new AI insights or analysis types
- Enhance data visualization
- Improve user experience
- Add export formats or sharing options

#### **📚 Documentation**
- Improve README or documentation
- Add code comments and examples
- Create tutorials or guides
- Fix typos and clarify instructions

#### **🎯 Performance & Optimization**
- Improve loading times
- Optimize mobile performance
- Reduce bundle size
- Enhance API efficiency

#### **🧪 Testing**
- Add unit tests
- Improve test coverage
- Add integration tests
- Create test utilities

### 📋 Before You Start

#### **Check Existing Issues**
- Browse [open issues](https://github.com/Dev-Somesh/Dev-Wrapped/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Comment on issues you'd like to work on

#### **Discuss Major Changes**
- For significant features, create an issue first
- Discuss the approach with maintainers
- Get feedback before investing time

---

## 🛠️ Development Setup

### 📋 Prerequisites

- **Node.js**: Version 18+ recommended
- **npm**: Version 8+ or yarn
- **Git**: For version control
- **Google Gemini API Key**: For AI features
- **Modern Browser**: Chrome recommended for development

### 🔧 Local Development

1. **Environment Configuration**
   ```bash
   # Required environment variables
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional for development
   GITHUB_TOKEN=your_github_token_here
   ```

2. **Development Commands**
   ```bash
   # Start development server with Netlify functions
   npm run dev:netlify
   
   # Start Vite dev server only
   npm run dev
   
   # Build for production
   npm run build
   
   # Preview production build
   npm run preview
   ```

3. **Testing Your Changes**
   - Test with multiple GitHub usernames
   - Verify mobile responsiveness
   - Check error handling
   - Test export functionality

### 🏗️ Project Structure

```
devwrapped-2025/
├── 📁 components/           # React components
│   ├── Landing.tsx          # Landing page
│   ├── DevelopmentDossier.tsx # Main dossier
│   ├── ShareCard.tsx        # Share card
│   └── ...
├── 📁 services/            # Business logic
│   ├── githubService.ts     # GitHub API
│   ├── geminiService.ts     # AI integration
│   └── security.ts         # Logging/security
├── 📁 netlify/functions/   # Serverless functions
├── 📁 assets/              # Static assets
├── types.ts                # TypeScript definitions
└── ...
```

---

## 📏 Coding Standards

### 🎯 Code Style

#### **TypeScript**
```typescript
// ✅ Good: Proper typing
interface GitHubStats {
  username: string;
  totalCommits: number;
  activeDays: number;
}

// ❌ Avoid: Using 'any'
const data: any = fetchData();

// ✅ Good: Explicit return types
const calculateStats = (data: GitHubData): GitHubStats => {
  // implementation
};
```

#### **React Components**
```typescript
// ✅ Good: Functional component with proper typing
interface Props {
  username: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent: React.FC<Props> = ({ username, onSubmit }) => {
  // implementation
};

// ✅ Good: Proper hook usage
useEffect(() => {
  // effect logic
}, [dependency]); // Always include dependencies
```

#### **CSS/Styling**
```typescript
// ✅ Good: Mobile-first responsive design
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// ✅ Good: Semantic class names
<button className="bg-[#39d353] hover:bg-[#2ea043] px-4 py-2 rounded-lg">
  Submit
</button>

// ❌ Avoid: Hardcoded values without responsive variants
<div className="text-2xl">
  Not responsive
</div>
```

### 📱 Mobile-First Development

Always consider mobile users first:

```typescript
// ✅ Good: Mobile-first responsive design
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
  {/* Content adapts from mobile to desktop */}
</div>

// ✅ Good: Touch-friendly sizing
<button className="min-h-[44px] px-4 py-3">
  Touch-friendly button
</button>
```

### 🔍 Code Quality

#### **Error Handling**
```typescript
// ✅ Good: Proper error handling
try {
  const data = await fetchGitHubData(username);
  return data;
} catch (error) {
  console.error('GitHub API error:', error);
  throw new Error('Failed to fetch GitHub data');
}
```

#### **Performance**
```typescript
// ✅ Good: Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateComplexStats(data);
}, [data]);

// ✅ Good: Proper cleanup
useEffect(() => {
  const controller = new AbortController();
  
  fetchData(controller.signal);
  
  return () => controller.abort();
}, []);
```

---

## 📝 Commit Guidelines

### 🎯 Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

```bash
# Format: type(scope): description

# Types:
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
perf: performance improvements
test: adding tests
chore: maintenance tasks

# Examples:
git commit -m "feat: add monthly activity grid for mobile"
git commit -m "fix: resolve mobile layout overflow issue"
git commit -m "docs: update API integration guide"
git commit -m "perf: optimize GitHub data fetching"
```

### 📋 Commit Best Practices

- **Keep commits atomic**: One logical change per commit
- **Write clear messages**: Explain what and why, not how
- **Reference issues**: Use `fixes #123` or `closes #123`
- **Test before committing**: Ensure your changes work

---

## 🧪 Testing Guidelines

### 📋 Manual Testing Checklist

Before submitting a PR, test these scenarios:

#### **✅ Core Functionality**
- [ ] Landing page loads correctly
- [ ] Form validation works (empty input, invalid usernames)
- [ ] GitHub data fetching succeeds for valid users
- [ ] AI insights generate properly
- [ ] Export functionality works (both share card and dossier)
- [ ] Error handling is graceful

#### **📱 Mobile Testing**
- [ ] Layout is responsive on mobile devices
- [ ] Touch targets are at least 44px
- [ ] Text is readable without zooming
- [ ] Monthly activity grid displays correctly (2x6 layout)
- [ ] Forms work well on mobile keyboards
- [ ] No horizontal scrolling

#### **🌐 Cross-Browser Testing**
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Edge

#### **🔍 Edge Cases**
- [ ] Users with no 2025 activity
- [ ] Users with private profiles only
- [ ] Network failures and timeouts
- [ ] API rate limiting scenarios

### 🎯 Test Cases to Consider

```typescript
// Example test scenarios
const testCases = [
  {
    username: 'octocat',
    expected: 'Should load successfully'
  },
  {
    username: 'nonexistentuser12345',
    expected: 'Should show user not found error'
  },
  {
    username: '',
    expected: 'Should show validation error'
  }
];
```

---

## 🚀 Pull Request Process

### 📋 PR Checklist

Before submitting your PR:

- [ ] **Code Quality**
  - [ ] Code follows project standards
  - [ ] No TypeScript errors
  - [ ] No console errors in browser
  - [ ] Proper error handling

- [ ] **Testing**
  - [ ] Manual testing completed
  - [ ] Mobile responsiveness verified
  - [ ] Cross-browser compatibility checked
  - [ ] Edge cases considered

- [ ] **Documentation**
  - [ ] Code is well-commented
  - [ ] README updated if needed
  - [ ] API changes documented

- [ ] **Performance**
  - [ ] No performance regressions
  - [ ] Bundle size impact considered
  - [ ] Mobile performance tested

### 📝 PR Template

When creating a PR, include:

```markdown
## 🎯 Description
Brief description of changes

## 🔧 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## 📱 Mobile Testing
- [ ] Tested on mobile devices
- [ ] Responsive design verified
- [ ] Touch interactions work

## 🧪 Testing
- [ ] Manual testing completed
- [ ] Edge cases considered
- [ ] Cross-browser tested

## 📸 Screenshots
(If applicable, add screenshots showing the changes)

## 📋 Additional Notes
Any additional context or notes for reviewers
```

### 🔍 Review Process

1. **Automated Checks**: Ensure all checks pass
2. **Code Review**: Maintainers will review your code
3. **Testing**: Changes will be tested thoroughly
4. **Feedback**: Address any requested changes
5. **Merge**: Once approved, your PR will be merged

---

## 🎨 Design Guidelines

### 🎯 Visual Consistency

#### **Color Palette**
```css
/* GitHub-inspired colors */
--github-bg: #0d1117;
--github-border: #30363d;
--github-text: #c9d1d9;
--github-green: #39d353;
--github-blue: #58a6ff;
--github-purple: #bc8cff;
--github-red: #ff7b72;
```

#### **Typography**
```css
/* Font hierarchy */
.font-display { font-family: 'Space Grotesk', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* Responsive text sizing */
.text-sm { font-size: 0.875rem; }     /* 14px */
.md:text-base { font-size: 1rem; }    /* 16px on desktop */
.lg:text-lg { font-size: 1.125rem; }  /* 18px on large screens */
```

#### **Spacing & Layout**
```css
/* Consistent spacing scale */
.space-y-4 { margin-top: 1rem; }      /* 16px */
.space-y-6 { margin-top: 1.5rem; }    /* 24px */
.space-y-8 { margin-top: 2rem; }      /* 32px */

/* Mobile-first padding */
.p-4 { padding: 1rem; }               /* 16px mobile */
.md:p-8 { padding: 2rem; }            /* 32px desktop */
```

### 📱 Mobile Design Principles

1. **Touch-First**: Design for fingers, not cursors
2. **Readable Text**: Minimum 16px font size
3. **Adequate Spacing**: 44px minimum touch targets
4. **Progressive Enhancement**: Mobile first, desktop enhanced
5. **Performance**: Optimize for slower connections

---

## 🐛 Bug Reports

### 📋 Bug Report Template

When reporting bugs, include:

```markdown
## 🐛 Bug Description
Clear description of the bug

## 🔄 Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## 🎯 Expected Behavior
What should happen

## 📱 Environment
- Device: (iPhone 12, Desktop, etc.)
- Browser: (Chrome 91, Safari 14, etc.)
- Screen size: (375x667, 1920x1080, etc.)

## 📸 Screenshots
(If applicable)

## 📋 Additional Context
Any other relevant information
```

### 🔍 Common Issues

#### **Mobile Layout Problems**
- Check viewport meta tag
- Verify responsive classes
- Test on actual devices

#### **API Integration Issues**
- Verify API keys are set
- Check network requests in DevTools
- Look for CORS errors

#### **Performance Issues**
- Monitor bundle size
- Check for memory leaks
- Test on slower devices/networks

---

## 💡 Feature Requests

### 🎯 Feature Request Template

```markdown
## ✨ Feature Description
Clear description of the proposed feature

## 🎯 Problem Statement
What problem does this solve?

## 💡 Proposed Solution
How should this feature work?

## 📱 Mobile Considerations
How should this work on mobile?

## 🎨 Design Ideas
Any design mockups or ideas

## 📋 Additional Context
Any other relevant information
```

### 🚀 Feature Ideas

Some areas where contributions are especially welcome:

- **New AI Insights**: Additional analysis types
- **Visualization Improvements**: Better charts and graphs
- **Export Formats**: PDF, different image sizes
- **Accessibility**: Screen reader support, keyboard navigation
- **Performance**: Faster loading, better caching
- **Mobile UX**: Enhanced mobile interactions

---

## 🏆 Recognition

### 🎉 Contributors

All contributors will be recognized in:
- **README.md**: Contributors section
- **Credits Modal**: In-app acknowledgment
- **Release Notes**: Feature attribution

### 🌟 Contribution Types

We recognize all types of contributions:
- 💻 **Code**: Features, bug fixes, improvements
- 📖 **Documentation**: Guides, examples, clarifications
- 🎨 **Design**: UI/UX improvements, assets
- 🐛 **Testing**: Bug reports, test cases
- 💡 **Ideas**: Feature suggestions, feedback
- 🤝 **Community**: Helping other contributors

---

## 📞 Getting Help

### 🆘 Need Assistance?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: [hello@someshbhardwaj.dev](mailto:hello@someshbhardwaj.dev)
- **Documentation**: [DOCUMENTATION.md](./DOCUMENTATION.md)

### 💬 Community Guidelines

- **Be Respectful**: Treat everyone with kindness
- **Be Constructive**: Provide helpful feedback
- **Be Patient**: Maintainers are volunteers
- **Be Collaborative**: Work together toward solutions

---

## 📚 Resources

### 🔗 Helpful Links

- **[React Documentation](https://react.dev/)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)**
- **[Conventional Commits](https://www.conventionalcommits.org/)**
- **[GitHub API Docs](https://docs.github.com/en/rest)**
- **[Google Gemini AI Docs](https://ai.google.dev/docs)**

### 🎓 Learning Resources

- **[React Hooks Guide](https://react.dev/reference/react)**
- **[TypeScript for React](https://react-typescript-cheatsheet.netlify.app/)**
- **[Mobile-First Design](https://web.dev/mobile/)**
- **[Accessibility Guidelines](https://web.dev/accessibility/)**

---

<div align="center">
  <h3>🎉 Thank You for Contributing!</h3>
  <p><em>Every contribution makes DevWrapped 2025 better for everyone</em></p>
  
  **Your efforts help developers worldwide celebrate their coding journeys! 🚀**
</div>

---

<p align="center">
  <sub>Contributing Guidelines | Last updated: December 2025</sub><br>
  <sub>📱 Mobile First | 🤖 AI Powered | 🤝 Community Driven</sub>
</p>