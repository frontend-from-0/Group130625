# 🛠️ Common Workflow Practices

### 1. **Version Control (Git)**
- **Always use Git** to manage your code changes.
- **Every feature, bugfix, or improvement** goes into a **separate branch** (not directly to `main`/`master`).
- Typical Git workflow:
  - `git checkout -b feature/new-login-page`
  - Write code
  - `git add .`
  - `git commit -m "Add login page UI"`
  - `git push origin feature/new-login-page`
- Then you create a **Pull Request (PR)** for review.

**Golden Rule:**  
Never push directly to `main` without review unless it's an emergency.

---

### 2. **Code Reviews**
- When you finish a task, you **submit a Pull Request (PR)**.
- Your teammates **review** your code for:
  - Correctness
  - Readability
  - Style
  - Security
  - Performance
- **You also review** others' PRs — it’s a shared responsibility.

**Tip:**  
Good code reviewers suggest improvements politely and explain why something matters.

---

### 3. **Issue Tracking (Jira, Trello, GitHub Issues)**
- Every task you work on should be **linked to an issue or ticket**.
- You pick a ticket, move it to “In Progress”, and update its status (example: “Done” or “Needs Review”).
- This helps **everyone see** what’s being worked on and what’s finished.

---

### 4. **Agile Ceremonies (Especially in Scrum Teams)**
- **Daily Stand-up** (15 minutes): Each person says
  - What they did yesterday
  - What they’ll do today
  - Any blockers
- **Sprint Planning**: Choosing what to work on for the next 1-2 weeks.
- **Sprint Review**: Demo what you built.
- **Sprint Retrospective**: Discuss what went well, what could be better.

**Tip:**  
Be clear and concise in meetings. Respect everyone’s time.

---

### 5. **Continuous Integration / Continuous Deployment (CI/CD)**
- Every time you push code:
  - Automated tests run
  - Code gets automatically deployed to a testing environment
- **Goal**: Catch problems early, deploy safely.

**As a beginner:**  
Your code should never break the build! Always run tests locally first.

---

# 🖥️ Common Workspace Practices

### 1. **Organized Project Structure**
- Code is **organized into folders**: for example, `src/`, `tests/`, `docs/`
- Naming things **clearly** matters.
- Follow the team's **coding standards** (naming, spacing, etc.).

---

### 2. **Environment Management**
- Use **.env** files for secrets (API keys, DB passwords), not hardcoding them into the code.
- Tools like **Docker** or **virtual environments** (Node.js’s `nvm`) help you work in isolated, clean environments.

---

### 3. **Code Formatting Tools**
- Use formatters like **Prettier**.
- Use linters like **ESLint**.
- **Most teams automate these checks** — so set them up early in your editor.

---

### 4. **Readable and Commented Code**
- **Write code as if the next person reading it is angry and tired.**  
- Good practice:
  - Use **clear variable names**.
  - Add **short comments** explaining tricky parts.
  - Avoid unnecessary complexity.

**Tip:**  
If a piece of code needs too many comments to explain, it probably needs to be simplified.

---

### 5. **Backup Your Work**
- Use Git properly.
- If working on something risky, **commit small and often**.
- When experimenting, create a **separate branch** to avoid messing up the main work.

---

# ⭐ Pro Tips for Beginners

- **Ask early, ask often.** It’s **better to ask** a small question early than fix a giant mistake later.
- **Focus on small tasks.** Deliver working pieces quickly.
- **Document as you go.** Even a few lines of documentation save hours later.
- **Use keyboard shortcuts** in your IDE/editor to move faster.
- **Be responsible for your tasks.** Always update the team if you're stuck.
- **Learn from code reviews.** Don't take feedback personally — see it as free mentorship.

---

✅ **Summary:**
> In professional software engineering, you work in an organized way with Git, tasks, reviews, small batches, communication, and responsibility. You aim to write clean, tested, well-organized code that fits into the team’s system — not just \"code that works.\"  
