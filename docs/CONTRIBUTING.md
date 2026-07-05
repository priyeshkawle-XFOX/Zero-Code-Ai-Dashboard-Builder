# 🤝 Contributing to AI Dashboard Builder

First off, thank you for considering contributing! 🎉 You rock. 🚀

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Style Guides](#style-guides)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

- ✅ Be welcoming and inclusive
- ✅ Be respectful of differing viewpoints
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of the GitHub page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/ai-dashboard-builder.git
cd ai-dashboard-builder
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/original-owner/ai-dashboard-builder.git
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 5. Set Up Development Environment

Follow the [SETUP.md](SETUP.md) guide to get the project running locally.

---

## 🛠️ How to Contribute

### 🐛 Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**Great bug reports include:**
- 🔍 A clear, descriptive title
- 📝 Step-by-step reproduction instructions
- 💻 Expected vs actual behavior
- 📸 Screenshots (if applicable)
- 🖥️ Your environment (OS, Python version, Node version, etc.)

**Template:**
```markdown
## Bug Description
[Clear description]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., Windows 11]
- Python: [e.g., 3.10.5]
- Node: [e.g., 18.17.0]
- Browser: [e.g., Chrome 120]
```

---

### 💡 Suggesting Features

Feature requests are welcome! Please provide:
- 🎯 The problem your feature solves
- 💡 Your proposed solution
- 🔄 Alternative solutions you've considered
- 📸 Mockups/wireframes (if applicable)

---

### 🔧 Submitting Code Changes

1. **Pick an issue** or create one first
2. **Comment on it** to let others know you're working on it
3. **Fork & branch** from `main`
4. **Make your changes** following our style guide
5. **Test thoroughly**
6. **Update documentation** if needed
7. **Submit a Pull Request**

---

## 🎨 Style Guides

### Python (Backend)

We follow [PEP 8](https://pep8.org/) with some tweaks:

```python
# ✅ Good
def calculate_total_sales(df: pd.DataFrame) -> float:
    """Calculate the total sales from a DataFrame."""
    return float(df['sales'].sum())

# ❌ Bad
def calc(df):
    return df['sales'].sum()
```

**Tools:**
- Use `black` for formatting
- Use `flake8` for linting
- Use `mypy` for type checking

```bash
pip install black flake8 mypy
black backend/
flake8 backend/
mypy backend/
```

---

### JavaScript / React (Frontend)

We follow the [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react).

```jsx
// ✅ Good
const Dashboard = ({ data }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="dashboard">{loading ? <Spinner /> : <Content />}</div>;
};

// ❌ Bad
function dashboard(props){
  return <div>{props.data}</div>
}
```

**Tools:**
- ESLint (already configured)
- Prettier for formatting

```bash
cd frontend
npm run lint
npx prettier --write src/
```

---

### 📁 File Naming

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `Dashboard.jsx` |
| Python Modules | snake_case | `insights_engine.py` |
| CSS Files | kebab-case | `history-page.css` |
| Folders | kebab-case | `ai-chat/` |

---

### 📝 Code Comments

```python
# ✅ Good - explains WHY
# Use the last numeric column as ML target (most common in sales data)
target_col = numeric_cols[-1]

# ❌ Bad - explains WHAT (obvious from code)
# Get the last column
target_col = numeric_cols[-1]
```

---

## 📋 Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding tests |
| `chore` | Build process, dependencies, etc. |

### Examples

```bash
feat(upload): add support for Excel file uploads
fix(chat): handle Ollama connection timeout
docs(readme): update installation instructions
style(dashboard): format with prettier
refactor(api): extract chart data logic to utils
test(upload): add tests for CSV parsing
chore(deps): upgrade pandas to 2.2.0
```

---

## 🔄 Pull Request Process

### 1. Before Submitting

- [ ] Code follows the style guide
- [ ] All tests pass
- [ ] New code has tests (if applicable)
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Branch is up to date with `main`

### 2. PR Template

When you open a PR, fill out this template:

```markdown
## Description
[What does this PR do?]

## Related Issue
Closes #[issue number]

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] My code follows the style guide
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
```

### 3. Review Process

- A maintainer will review your PR within 3-5 days
- Address any requested changes
- Once approved, your PR will be merged 🎉

---

## 🏷️ Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature request |
| `documentation` | Documentation improvements |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `priority: high` | Critical issues |
| `priority: low` | Nice to have |

---

## 🎯 Development Tips

### Hot Reload

Both servers support hot reload:
- **Backend:** `uvicorn --reload` auto-restarts on file changes
- **Frontend:** `react-scripts start` auto-refreshes browser

### Debugging

**Backend (Python):**
```python
import pdb; pdb.set_trace()  # Add breakpoint
```

**Frontend (React):**
```javascript
console.log('Debug:', data);  // Browser DevTools
```

### Common Tasks

**Add a new API endpoint:**
1. Create route in `backend/app/routes/`
2. Register router in `main.py`
3. Update `docs/API.md`

**Add a new page:**
1. Create component in `frontend/src/pages/`
2. Add route in `App.js`
3. Add to sidebar navigation

**Add a new ML model:**
1. Add logic in `backend/app/services/`
2. Update `requirements.txt`
3. Document in API reference

---

## 📞 Getting Help

- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/ai-dashboard-builder/discussions)
- 🐛 **Issues:** [GitHub Issues](https://github.com/yourusername/ai-dashboard-builder/issues)
- 📧 **Email:** maintainer@example.com

---

## 🙏 Recognition

Contributors will be added to the [README.md](../README.md) acknowledgments section.

---

**Thank you for contributing! Every PR, issue, and star helps make this project better.** ⭐

Made with ❤️ by the AI Dashboard Builder community
