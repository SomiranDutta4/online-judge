# Online Judge

A full-stack **Online Judge platform** for practicing competitive programming, submitting solutions, and automatically evaluating code against predefined test cases.

The platform provides a complete workflow from **problem discovery → code submission → isolated execution → test-case evaluation → verdict and submission history**.

---

## ✨ Features

### 👤 User Management

* User registration and authentication
* JWT-based authentication
* Password protection with hashing
* Email verification
* Forgot-password workflow
* User profiles and submission history

### 🧩 Problem Management

* Browse programming problems
* Search problems by name
* Filter problems using tags
* View problem statements and constraints
* Create and manage coding problems
* Define test cases for problems

### 💻 Online Code Execution

Users can submit solutions directly from the browser.

The judge service:

1. Receives the submitted source code
2. Prepares the execution environment
3. Compiles the program when required
4. Executes it against test cases
5. Monitors execution
6. Compares the generated output with expected output
7. Returns the appropriate verdict

### ⚖️ Judging & Verdicts

The system supports common online-judge verdicts:

| Verdict                            | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| ✅ **Accepted (AC)**                | Solution passed all test cases              |
| ❌ **Wrong Answer (WA)**            | Output differs from the expected output     |
| ⏱️ **Time Limit Exceeded (TLE)**   | Program exceeded the allowed execution time |
| 💾 **Memory Limit Exceeded (MLE)** | Program exceeded the allowed memory         |
| 🔨 **Compilation Error (CE)**      | Program failed during compilation           |
| ⚠️ **Runtime Error (RTE)**         | Program terminated unexpectedly             |

Execution statistics such as runtime and memory usage can be reported along with the verdict.

### 📊 Submission & Statistics

* Submission history
* Individual submission results
* Problem-solving statistics
* User dashboard
* Leaderboard

### 🔐 Security & API Protection

* JWT-based authentication
* Password hashing
* Email verification
* API-level authentication
* Code execution isolated from the main application using dedicated execution infrastructure

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* JavaScript
* React Router
* Axios
* React Bootstrap
* React Hook Form
* React Ace — code editor
* React Quill
* Styled Components

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* bcrypt / bcryptjs

### Judge Service

* **Node.js**
* Express.js
* Docker-based execution
* Process management
* Asynchronous execution utilities
* File-system based submission handling

### Development Tools

* npm
* Nodemon
* Docker
* Git

---

## 🏗️ Architecture

The application is divided into separate services responsible for the user-facing application, backend APIs, data storage, and code execution.

```text
                         ┌──────────────────┐
                         │     Browser      │
                         │  React Frontend  │
                         └────────┬─────────┘
                                  │
                                  │ HTTP / REST
                                  ▼
                         ┌──────────────────┐
                         │  Express Server  │
                         │   REST APIs      │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             ┌──────────────┐          ┌────────────────┐
             │   MongoDB    │          │  Judge Service │
             │   Database   │          │     Node.js    │
             └──────────────┘          └───────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Docker Sandbox  │
                                      │                 │
                                      │ Compile         │
                                      │ Execute         │
                                      │ Test            │
                                      └────────┬────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Verdict / Stats │
                                      └─────────────────┘
```

The important architectural separation is between the **web application** and the **code execution environment**. Submitted programs are handled by the judge service rather than being executed directly inside the main API process.

---

## 🔄 Submission Workflow

A typical submission follows this pipeline:

```text
User writes code
       │
       ▼
Select language
       │
       ▼
Submit solution
       │
       ▼
Backend receives submission
       │
       ▼
Judge service
       │
       ▼
Prepare execution environment
       │
       ▼
Compile (if required)
       │
       ▼
Execute against test cases
       │
       ▼
Collect output + execution metrics
       │
       ▼
Compare with expected output
       │
       ▼
Generate verdict
       │
       ▼
Store submission result
       │
       ▼
Display result to user
```

---

## 📁 Project Structure

```text
online-judge/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── express_server/
│   ├── ...
│   └── package.json
│
├── server/
│   └── ...
│
├── judge/
│   ├── ...
│   └── package.json
│
├── database/
│   └── ...
│
├── images/
│   └── ...
│
├── Workflow.jpeg
├── Workflow.pdf
├── Online-Judge System.pdf
├── plagiarismdetector.pdf
├── solution.cpp
└── testcases.txt
```

### `client/`

Contains the React frontend of the platform, including the problem interface, code editor, authentication pages, dashboards, submissions, and other user-facing components.

### `express_server/`

Contains the Express-based backend/API layer responsible for application-level server functionality, authentication, and database interaction.

### `server/`

Contains server-side application components used by the platform.

### `judge/`

Contains the dedicated judging/execution service responsible for processing submitted programs and running them in the execution environment.

### `database/`

Contains database-related resources and configuration.

---

## 🌐 Supported Languages

The platform is designed to support multiple compiled and interpreted languages through the judge service.

Current project documentation lists support for:

* C
* C++ (GCC)
* Java
* Python 3

The exact compiler/runtime versions depend on the execution environment configured for the judge.

---

## ⚙️ Prerequisites

Before running the project locally, install:

* **Node.js**
* **npm**
* **MongoDB**
* **Docker**
* A compiler/runtime for the languages configured in the judge environment

Make sure Docker is running before starting the judge service.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SomiranDutta4/online-judge.git
cd online-judge
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

Start the frontend:

```bash
npm start
```

---

### 3. Configure the Backend

Navigate to the backend service:

```bash
cd express_server
npm install
```

Create the required environment configuration.

Example:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Start the development server:

```bash
npm run dev
```

---

### 4. Start the Judge Service

Open another terminal:

```bash
cd judge
npm install
```

Configure the judge service according to the execution environment.

Then start it:

```bash
npm start
```

Make sure Docker is running before submitting code.

---

## 🔑 Environment Variables

The exact variables depend on the service being configured.

Typical configuration includes:

```env
PORT=<server_port>

MONGODB_URI=<mongodb_connection_string>

JWT_SECRET=<jwt_secret>

BACKEND_URL=<backend_url>

JUDGE_URL=<judge_service_url>
```

**Never commit production secrets, JWT keys, database credentials, or email credentials to the repository.**

---

## 🐳 Docker-Based Code Execution

Running arbitrary user-submitted code directly on the host machine is unsafe.

The judge therefore separates code execution from the main application and uses Docker-based isolation.

Conceptually:

```text
                    User Submission
                           │
                           ▼
                    Judge Service
                           │
                           ▼
                  Docker Container
                           │
              ┌────────────┴────────────┐
              │                         │
           Compile                   Execute
              │                         │
              └────────────┬────────────┘
                           ▼
                     Test Cases
                           │
                           ▼
                       Verdict
```

This architecture prevents submitted programs from being executed directly inside the main web-server process.

> **Security note:** Docker isolation should not automatically be considered a complete production-grade sandbox. A publicly exposed judge should additionally enforce strict CPU, memory, process, filesystem, network, and execution-time restrictions.

---

## 🧪 Testing a Submission

A typical judging cycle is:

```text
Source Code
     │
     ▼
Compilation
     │
     ├── Failed ────────► Compilation Error
     │
     ▼
Execute Program
     │
     ├── Timeout ───────► Time Limit Exceeded
     │
     ├── Crash ─────────► Runtime Error
     │
     ▼
Run Test Cases
     │
     ├── Output mismatch ► Wrong Answer
     │
     ▼
All tests passed
     │
     ▼
Accepted
```

---

## 📈 Scalability Considerations

The judge is separated from the main API so that code execution can evolve independently from the web application.

A natural scaling architecture is:

```text
                    API Server
                        │
                        ▼
                   Job Queue
                  /    |    \
                 /     |     \
                ▼      ▼      ▼
            Judge 1 Judge 2 Judge 3
                │      │      │
                ▼      ▼      ▼
             Docker Docker Docker
```

This allows multiple judge workers to process submissions concurrently without making the main API responsible for long-running code execution.

---

## 🔒 Security Considerations

An online judge executes **untrusted user-generated code**, so security is a core concern.

Important production safeguards include:

* Container isolation
* CPU limits
* Memory limits
* Process limits
* Execution timeouts
* Restricted filesystem access
* Restricted network access
* Non-root container execution
* API rate limiting
* Request validation
* Secure authentication
* Secure secret management
* HTTPS in production

The judge service should be treated as a security-sensitive component of the system.

---

## 🧭 Future Improvements

Potential improvements include:

* [ ] Asynchronous submission queue
* [ ] Multiple judge workers
* [ ] Horizontal scaling of judge workers
* [ ] Real-time submission status
* [ ] Stronger container isolation
* [ ] Contest management
* [ ] Contest-specific leaderboards
* [ ] Plagiarism detection
* [ ] Advanced rate limiting
* [ ] Submission prioritization
* [ ] Better execution monitoring
* [ ] Production deployment with Docker Compose/Kubernetes
* [ ] Centralized logging and monitoring

---

## 📚 Project Documentation

Additional design material is available inside the repository:

* `Online-Judge System.pdf` — system documentation
* `Workflow.pdf` — workflow/design documentation
* `Workflow.jpeg` — architecture/workflow diagram
* `plagiarismdetector.pdf` — plagiarism detection documentation

---

## 🤝 Contributing

Contributions and improvements are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

Then open a pull request.

---
## 👨‍💻 Author

**Somiran Dutta**

IIT Guwahati

[GitHub](https://github.com/SomiranDutta4)
