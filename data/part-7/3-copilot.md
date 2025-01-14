---
path: '/part-7/3-copilot'
title: 'Setting Up and Using GitHub Copilot in Visual Studio Code  '
hidden: false
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- Know how to **install and activate GitHub Copilot** in VS Code.
- Understand how to **use GitHub Copilot for auto-completion and suggestions**.
- Be able to **generate functions, comments, and documentation using Copilot**.
- Learn how to **experiment with Copilot for better coding efficiency**.
- Discover **best practices** when using GitHub Copilot in projects.

</text-box>

## Step 1: Ensure Copilot is Activated in Your GitHub Account

Before installing GitHub Copilot in Visual Studio Code, check if you have Copilot access:

1. Go to GitHub Copilot settings:
   [GitHub Copilot Settings](https://github.com/settings/copilot)
2. Verify your subscription (Free for students via the GitHub Student Developer Pack)
3. Enable Copilot for your IDE (Ensure it is activated for Visual Studio Code)

---

## Step 2: Install GitHub Copilot in Visual Studio Code

Follow these steps to install and activate GitHub Copilot in Visual Studio Code:

### 1. Install the GitHub Copilot Extension

- Open Visual Studio Code
- Go to Extensions Marketplace (`Ctrl + Shift + X` / `Cmd + Shift + X` on macOS)
- Search for "GitHub Copilot"
- Click Install

Direct Link: [GitHub Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

---

### 2. Sign in to GitHub from Visual Studio Code

- Open Visual Studio Code and go to the Command Palette (`Ctrl + Shift + P` / `Cmd + Shift + P` on macOS)
- Search for "GitHub: Sign in to GitHub"
- Follow the authentication prompts

---

### 3. Enable GitHub Copilot in Visual Studio Code

- Open Command Palette again
- Search for "GitHub Copilot: Enable"
- Select "Enable Copilot for this workspace"

Now you are ready to use GitHub Copilot.

---

## Using GitHub Copilot in Visual Studio Code

### Auto-Completion and Code Suggestions

- Start typing in an empty `.py` file
- Copilot will suggest code inline
- Press `Tab` to accept suggestions or `Esc` to dismiss

Example: Type the following in a Python file:

```python
def add(a, b):
```
***Copilot will suggest the full function***

### Generate Entire Functions and Code Blocks

Copilot can suggest entire functions based on comments. Try this:

- Open a new Python file (.py) (You may also use the same file that you have created above)
- Type the following comment:
```python
# Function to check if a number is prime
```
- Press Enter and wait for Copilot to suggest the full function, Copilot will generate the function or code block.

### Generate Documentation and Comments

- Copilot can add docstrings and comments to existing functions.

- Example: Type a function without comments:
```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)
```

- Hover over the function and ask Copilot to generate documentation.

## GitHub Copilot Chat in Visual Studio Code

**GitHub Copilot Chat** is an interactive AI-powered assistant built into Visual Studio Code. It allows you to ask coding-related questions, debug errors, and generate explanations directly within the editor.

### How to Enable GitHub Copilot Chat?

1. **Install the GitHub Copilot Chat Extension**
    - Open Visual Studio Code
    - Go to Extensions Marketplace (Ctrl + Shift + X / Cmd + Shift + X on macOS)
    - Search for "GitHub Copilot Chat" and install it

2. **Open Copilot Chat Panel**

    - Click the Copilot Chat Icon on the Activity Bar in VS Code
Or use the shortcut Ctrl + Shift + I (Windows/Linux) or Cmd + Shift + I (Mac)
3. **Sign in to GitHub and Start Asking Questions**

## Example Uses of Copilot Chat

### Explain a Piece of Code.
- You can select any part of the code and ask.

```python
Explain this code
```
***Copilot Chat will respond your question and provide a relevant reply.***

### Debug an Error

- If your code has an error, ask:
**Example code with an error**
```python
def divide_numbers(a, b):
    return a / b
```
**Call the function with zero:**
```python
print(divide_numbers(10, 0))
```

**Chat**
```python
Why am I getting this error?
```
***Copilot Chat will respond and will also suggest a fix.***

### Generate Code Snippets

**Ask:**
**Chat**
```python
Write a Python function to sort a list of dictionaries by a key.
```
## Learn More
- Official GitHub Copilot [Documentation](https://docs.github.com/en/copilot)
- GitHub Copilot YouTube Tutorials: GitHub Copilot on [YouTube](https://www.youtube.com/results?search_query=GitHub+Copilot+VS+Code)

## Ethical Use of AI Tools in Studies at Laurea UAS

### Guidelines for Using AI in Academic Work

Laurea University of Applied Sciences has provided ethical guidelines for students to ensure responsible AI use in their studies. Below are the key principles to follow:

**Source:** [Laurea UAS AI Guidelines](https://www.laurea.fi/en/degree_programmes/opiskelijana-laureassa/Utilisation-of-artificial-intelligence-in-teaching-and-studies-at-Laurea-University-of-Applied-Sciences/)

### 1. Disclose AI Usage
- Always mention if and how AI has been used in assignments or research.
- Transparency in AI-assisted work maintains academic integrity.
- Example: If AI was used to generate ideas or summaries, cite the tool in your references.

### 2. Adhere to Data Protection Policies
- Ensure that using AI does not compromise personal data or violate GDPR.
- Check the data privacy policies of AI tools before inputting sensitive information.

### 3. Maintain Academic Integrity
- Do not submit AI-generated content as original work.
- AI should support learning, not replace individual effort.
- Example: If AI-generated content is paraphrased, it should be properly cited.

### 4. Verify AI-Generated Information
- AI-generated content may contain errors or biases.
- Cross-check AI outputs with reliable academic sources before using them.
- Example: Do not rely on AI for fact-based research without verification.

### 5. Respect Copyright Laws
- Ensure that AI-generated materials do not violate copyright laws.
- Do not use AI tools to generate copyrighted or plagiarized content.
- Example: When using AI-generated text, cite it as an external source.

### 6. Follow Course-Specific AI Policies
- Some courses may allow or restrict AI use differently.
- Always check the guidelines provided by instructors before using AI.

### 7. Use AI to Enhance Learning, Not Replace Thinking
- AI can be a great learning assistant but should not replace critical thinking.
- Example: Use AI for proofreading, brainstorming, or code debugging, but ensure final submissions are your own work.

### 8. Avoid Unauthorized Recording with AI
- Do not use AI tools to record virtual classes without consent.
- Unauthorized recording violates data privacy and student rights.
