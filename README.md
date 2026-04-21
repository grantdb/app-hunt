# App Hunt

![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)
![Devvit](https://img.shields.io/badge/Devvit-FF4500?style=for-the-badge&logo=devvit&logoColor=white)
![Webview](https://img.shields.io/badge/Tech-React_Webview-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Discovery](https://img.shields.io/badge/Category-App_Discovery-brightgreen?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Validated-success?style=for-the-badge)

App Hunt is a premium discovery platform integrated directly into the Reddit client, designed to help community members find, share, and discuss the latest digital tools and software. Built with high-fidelity React Webview technology, it offers a sleek, modern interface that bridges the gap between community discussion and software exploration.

## Features

- **Interactive Discovery Engine**: A modern, responsive web-based UI tailored for high-speed software browsing.
- **Community Curation**: Leverages Reddit's voting and discussion systems to highlight the most useful applications.
- **Standardized Metadata**: Displays clear icons, descriptions, and categories for every featured application.
- **Deep Integration**: Seamlessly communicates with Reddit's persistent storage for real-time ranking and discovery logs.

## Technical Architecture (Mission OS v0.12.20)

This application has been upgraded to the latest Devvit standards:
- **Unified Build System**: Uses a custom `esbuild` pipeline (`tools/build.ts`) for high-performance bundling and sandbox compatibility.
- **Dependency Hardening**: Aligned on `@devvit/public-api@0.12.20`.
- **Security Protocols**: Source-managed with Git-hardened `.gitignore` to protect sensitive environment variables.

## Deployment Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Launch local playtest environment. |
| `npm run build` | Generate production-ready bundles. |
| `npm run publish:public` | **NEW**: Submit the app for public review and listing on the Reddit marketplace. |

## Configuration

The application is designed for immediate deployment with minimal oversight.

| Setting | Requirement |
|---------|-------------|
| **Theme Sync** | Automatically adapts its visual style to match the user's Reddit client (Dark/Light). |
| **Discovery Logic** | Intelligent ranking based on community engagement and software relevance. |

## Legal

This application is subject to the following legal agreements:
- [Terms of Service](https://github.com/grantdb/reddit-app-legal/blob/main/app-hunt/TERMS.md)
- [Privacy Policy](https://github.com/grantdb/reddit-app-legal/blob/main/app-hunt/PRIVACY.md)

---
*Built for the Reddit community.*
