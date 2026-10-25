# 🚀 Next.js Projects and Learning Tasks

Welcome! This repository brings together Next.js applications, UI experiments, and learning resources built while exploring modern web development. Projects cover routing, reusable components, state management, authentication, maps, AI-inspired interfaces, and headless content management.

> 📦 **Repository structure:** Each app lives in its own folder and has its own dependencies. This is a collection of independent projects, not one installable monorepo.

## 🗂️ Project directory

| Project | Description | Main technologies |
| --- | --- | --- |
| [`MyInstagramApp/`](./MyInstagramApp/) | Instagram-inspired interface and UI practice. | Next.js, React, Tailwind CSS, React Icons |
| [`Next.js-with-sanity/headless/`](./Next.js-with-sanity/headless/) | **Saylani Tech Blog**: published post listings, individual post pages, and an embedded Sanity Studio. | Next.js App Router, Sanity, GROQ, Portable Text, Tailwind CSS |
| [`ai-based-nextjs-app/`](./ai-based-nextjs-app/) | Next.js starter and UI experiments for an AI-themed application. | Next.js, React, Tailwind CSS |
| [`firebase-authentication-project/`](./firebase-authentication-project/) | **AI Labs** interface and Firebase sign-up/sign-in experiments, Redux Toolkit state, and a React Flow workflow visualization. | Next.js, Firebase Auth, Redux Toolkit, React Flow, Tailwind CSS |
| [`my-lovable-app/`](./my-lovable-app/) | UI prototype with reusable headings and animated text. | Next.js, React, Tailwind CSS, React Type Animation |
| [`my-todo-app/`](./my-todo-app/) | To-do application and Redux Toolkit state-management practice. | Next.js, React, Redux Toolkit, Tailwind CSS |
| [`my-tree-planting-map-app/`](./my-tree-planting-map-app/) | Interactive tree-planting map project, including Leaflet and Firebase setup experiments. | Next.js, React Leaflet, Leaflet, Firebase |
| [`saylani-gpt/`](./saylani-gpt/) | SaylaniGPT chat interface prototype. | Next.js, React, Tailwind CSS, React Icons |
| [`shadcn-card/`](./shadcn-card/) | Card component and shadcn/ui styling practice. | Next.js, React, shadcn/ui, Tailwind CSS |
| [`tree-planting-map-app-using-reactleaflet/`](./tree-planting-map-app-using-reactleaflet/) | React Leaflet tree-planting map implementation and learning notes about map clicks, planting details, markers, and persistence. | Next.js, React Leaflet, Firebase SDK, Tailwind CSS |
| [`university-app/`](./university-app/) | Multi-page university site with About, Courses, Faculty, and Contact routes. | Next.js, React, Tailwind CSS |

## 🧭 What you can explore

- **Pages and navigation:** multi-page layouts and routes using the Next.js App Router.
- **UI building:** component composition, responsive styling, icons, and animation.
- **State management:** Redux Toolkit patterns in the authentication and to-do projects.
- **Authentication:** Firebase email/password sign-up and sign-in experiments.
- **Interactive maps:** Leaflet map interactions, markers, and tree details.
- **Content management:** Sanity Studio, GROQ queries, and published blog content.

Projects are at different stages of development. Treat descriptions as a guide, and see each app's source and README for its current behavior and setup details.

## 🌐 Live demos

These deployments are provided for convenience; availability and content may change.

- [Shadcn Card](https://shadcn-card.vercel.app/)
- [Instagram App](https://instagram-app-chi.vercel.app/)
- [Tree Planting Map](https://next-js-smit-tasks.vercel.app/)
- [AI Labs Firebase App](https://react-redux-firebase-project-green.vercel.app/)

## 📚 Learning resources and standalone files

- [React Hook Form notes](https://app.notion.com/p/React-Hook-Form-3e8f1d8446b180e49a68d6e6f00edef0?source=copy_link)
- [Tree Planting Map notes](https://app.notion.com/p/Project-Tree-Planting-Map-3ef98fe24ac180febe99eafa91650657?source=copy_link)
- `ai_labs_dashboard.html` and `ai_labs_login_page.html` — standalone AI Labs page mockups.
- `align-child-item.rtf` and `gradient-border.rtf` — styling and layout notes.
- `task.jpg` — image resource.

For more detailed setup or project-specific explanations, start with the README inside that project's folder. The Saylani Tech Blog also includes lesson notes and a student guide under `Next.js-with-sanity/headless/docs/`.

## 💻 Run a project locally

### Prerequisites

- Install Node.js and npm.
- Use a Node.js version supported by the specific app's Next.js version.
- Some projects require extra setup, such as Firebase configuration or Sanity access. Check the app's README and environment-variable examples before running it.

### Start the development server

Choose one project folder, install that project's dependencies, and start its development server. For example, in PowerShell:

```bash
cd .\firebase-authentication-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. To work on another app, change into its folder first. The Sanity blog is nested under `Next.js-with-sanity/headless/`, so run its commands from that directory. If port 3000 is already in use, Next.js may prompt to use another port.

### Common scripts

Most projects define these scripts in their `package.json`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint checks. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after building. |

Run scripts from the app directory, and confirm that the selected project provides the script before using it.

## 🔐 Configuration and security

- Keep private credentials and local environment files out of source control.
- Follow each app's setup guide for required Firebase or Sanity configuration.
- Do not expose private API keys, tokens, or write credentials in client-side code or `NEXT_PUBLIC_` environment variables.
- Public client configuration values should only be used as documented by the relevant service.

## 🤝 Working with the projects

1. Pick an app and read its README first.
2. Install dependencies inside that app's directory.
3. Make and test changes within the selected project.
4. Run its lint or build script when appropriate.
5. Keep app-specific setup instructions in that app's own documentation.

Happy building! ✨
