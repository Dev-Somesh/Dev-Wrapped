# Contributing to DevWrapped 2025

Thank you for your interest in contributing to DevWrapped 2025! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use GitHub Issues to report bugs or request features
- Provide detailed information including steps to reproduce
- Include screenshots or error messages when applicable
- Check existing issues to avoid duplicates

### Submitting Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with conventional commit messages
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📋 Development Guidelines

### Code Standards
- **TypeScript**: Use strict type checking
- **ESLint**: Follow linting rules
- **Prettier**: Use consistent code formatting
- **Conventional Commits**: Use semantic commit messages

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(components): add export functionality to ShareCard
fix(api): handle rate limiting errors properly
docs(readme): update installation instructions
```

### Code Style
- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use semantic HTML and ARIA attributes for accessibility

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Google Cloud account (for Gemini API testing)

### Local Development
1. Clone your fork
   ```bash
   git clone https://github.com/your-username/devwrapped-2025.git
   cd devwrapped-2025
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   # Create .env file
   GEMINI_API_KEY=your_test_api_key
   ```

4. Start development server
   ```bash
   npm run dev
   ```

### Testing
- Test all changes manually in the browser
- Verify responsive design on different screen sizes
- Test with different GitHub usernames
- Ensure error handling works correctly
- Test export functionality

## 🎯 Areas for Contribution

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness enhancements
- Error handling improvements
- Documentation updates

### Medium Priority
- Additional AI model support
- Enhanced visualizations
- New statistics and metrics
- UI/UX improvements
- Code refactoring

### Low Priority
- Additional export formats
- Theme customization
- Internationalization
- Advanced analytics features

## 🔧 Technical Architecture

### Key Components
- **App.tsx**: Main application logic and state management
- **ShareCard.tsx**: Summary card component
- **DevelopmentDossier.tsx**: Detailed analysis component
- **Services**: API integration and data processing
- **Netlify Functions**: Serverless backend

### Data Flow
1. User input → GitHub API → Data processing
2. Processed data → Gemini AI → Insights generation
3. Combined data → React components → UI rendering
4. Export functionality → Image generation

### API Integration
- GitHub API for user data
- Gemini AI for insights generation
- Netlify Functions for secure API proxying

## 🚀 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Changes are tested locally
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional format
- [ ] No console errors or warnings
- [ ] Responsive design is maintained

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested locally
- [ ] Tested on different screen sizes
- [ ] Tested with different GitHub users
- [ ] No console errors

## Screenshots
(If applicable)

## Additional Notes
Any additional information or context
```

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Testing and validation
4. Merge after approval

## 📚 Resources

### Documentation
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Comprehensive technical docs
- [README.md](./README.md) - Project overview and quick start
- [CHANGELOG.md](./CHANGELOG.md) - Version history

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Google Gemini API](https://ai.google.dev/docs)

## 🆘 Getting Help

### Community Support
- GitHub Discussions for questions
- GitHub Issues for bug reports
- Code review feedback in PRs

### Direct Contact
- **Email**: hello@someshbhardwaj.me
- **Portfolio**: [someshbhardwaj.me](https://someshbhardwaj.me)
- **LinkedIn**: [ersomeshbhardwaj](https://www.linkedin.com/in/ersomeshbhardwaj/)

## 📄 License

By contributing to DevWrapped 2025, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes (for significant contributions)

Thank you for helping make DevWrapped 2025 better! 🚀