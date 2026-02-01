# Contributing Guidelines

This document outlines the process for contributing to the OWL Cyber Club website codebase.

## Commit Message Tags

Please always append one of the following tags before your commit messages, depending on work done.  

| Tag | Purpose | When to use it... |
| --- | --- | --- |
| **`feat`** | **New Feature** | You’re adding a brand new capability or functionality to the app. |
| **`fix`** | **Bug Fix** | You’re patching a bug or fixing a broken piece of existing logic. |
| **`docs`** | **Documentation** | You changed the README, added comments, or updated internal docs. |
| **`style`** | **Formatting** | Changes that don’t affect code meaning (white-space, linting, semi-colons). |
| **`refactor`** | **Code Cleanup** | Changing code for readability or performance without adding a feature or fixing a bug. |
| **`perf`** | **Performance** | A code change that specifically improves execution speed or memory usage. |
| **`test`** | **Testing** | Adding missing tests or correcting existing ones. |
| **`build`** | **Build System** | Changes affecting the build system, dependencies (npm, pip), or external scripts. |
| **`ci`** | **CI Config** | Changes to GitHub Actions, GitLab CI, Jenkins, or other pipeline configs. |
| **`chore`** | **Maintenance** | General tasks that don't modify `src` or `test` files (e.g., updating `.gitignore`). |
| **`revert`** | **Undo** | When you need to roll back a previous commit. |

## Commiting Policy

- Don't commit tiny changes like fixing a typo, that will unnecessarily use our CI\CD (GitHub Pages) deployments (we only get 500 per month).
- Commit a specific feature(s) or fix(es) at a time. One or two features and some fixes at a time are OK.
