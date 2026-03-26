# Stakeholder Manager — Technical Test

## Overview

This is a full-stack web application for managing stakeholders. It is used as the basis for a technical interview test.

**Tech stack:**
- **Frontend:** React 18 + TypeScript (Vite)
- **Backend:** ASP.NET Core 8 Web API (C#)
- **Database:** SQLite via Entity Framework Core

## Project Structure

```
cm-tech-test/
├── backend/
│   ├── StakeholderApi/             # ASP.NET Core Web API
│   │   ├── Controllers/
│   │   ├── Data/                   # EF Core DbContext
│   │   ├── Migrations/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Program.cs
│   ├── StakeholderApi.Tests/       # xUnit test project
│   └── StakeholderApi.sln
└── frontend/                       # React TypeScript app
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── types/
```

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) v18+

## Getting Started

### 1. Run the backend

```bash
cd backend/StakeholderApi
dotnet run
```

The API will start at `http://localhost:5000`.
Swagger UI is available at `http://localhost:5000/swagger`.

> The SQLite database is created automatically on first run and seeded with sample data.

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Running tests

**Backend:**
```bash
cd backend
dotnet test
```

**Frontend:**
```bash
cd frontend
npm test
```

---

## The Task

The application currently allows you to **view a list of stakeholders**.

Your task is to **add the ability to create a new stakeholder**. This should include:

### 1. Add new stakeholder field — `Title`

Add a new, optional stakeholder field for title. It should be displayed in the table with a `-` when empty.

### 2. Add pagination to the stakeholder table

Add pagination to the stakeholder table with options of 5, 10, 25 rows.

### 3. Add new backend endpoint

Add a new endpoint that accepts stakeholder data and persists it to the database.
Stakeholder emails must be unique across all stakeholders.

### 4. Frontend — Create Stakeholder screen

Add a new page with a form to create a stakeholder. It should be reachable via the navigation bar.

### 5. Tests

Add unit tests to cover the new logic you've introduced.

---

### Stakeholder fields

| Field        | Required |
|--------------|----------|
| First Name   | Yes      |
| Last Name    | Yes      |
| Email        | Yes      |
| Role         | Yes      |
| Organisation | Yes      |

### Acceptance criteria

- The new, optional Title field is displayed in the table
- The stakeholder table supports paging with options of 5, 10, 25 rows
- The user can navigate to a **Create Stakeholder** page from the navigation bar
- The form validates that all required fields are filled before submitting
- Stakeholder email uniqueness is enforced
- On successful creation, the user is redirected to the stakeholders list
- The newly created stakeholder appears in the list
- New logic is covered by unit tests
