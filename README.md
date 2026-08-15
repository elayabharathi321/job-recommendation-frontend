# Job Recommendation System

A full-stack job recommendation application that recommends jobs to
users based on their skills stored in a Neo4j graph database.

## Project Overview

The application contains:

-   **Frontend:** Angular
-   **Backend:** Java + Spring Boot
-   **Database:** Neo4j
-   **API:** REST API
-   **Deployment:** Vercel for the frontend and Render for the backend

The system finds the skills connected to a user and recommends jobs that
require those skills.

## Architecture

``` text
Angular Frontend
       |
       | REST API
       v
Spring Boot Backend
       |
       | Neo4j Java Driver
       v
Neo4j / Cognodb
```

## Main Features

-   Enter a User ID.
-   Retrieve user information.
-   Display the user's name.
-   Display the user's skills.
-   Find recommended jobs based on matching skills.
-   Display:
    -   Job title
    -   Company
    -   Location
    -   Salary
-   Support multiple users with different skills.
-   REST API communication between Angular and Spring Boot.

## Technologies

### Frontend

-   Angular
-   TypeScript
-   HTML
-   CSS

### Backend

-   Java 21
-   Spring Boot
-   Spring Web MVC
-   REST API
-   Maven
-   Neo4j Java Driver

### Database

-   Neo4j
-   Cypher Query Language

## Neo4j Graph Model

The main relationships are:

``` text
User
 |
 | HAS_SKILL
 v
Skill
 ^
 | REQUIRES
 |
Job
 |
 | OFFERED_BY
 v
Company
```

Example:

``` text
User 1
  |
  +-- HAS_SKILL --> Java
  |
  +-- HAS_SKILL --> Spring Boot
  |
  +-- HAS_SKILL --> MySQL

Java
  ^
  |
REQUIRES
  |
Java Backend Developer
  |
  +-- OFFERED_BY --> TechNova Solutions
```

## Backend API

The recommendation endpoint is:

``` text
GET /api/jobs/recommendations/{userId}
```

Example:

``` text
GET https://job-recommendation-backend-6nfw.onrender.com/api/jobs/recommendations/1
```

The API response contains the user information and recommended jobs.

Example response:

``` json
{
  "userId": 1,
  "userName": "Elayabharathi",
  "userSkills": [
    "Java",
    "Spring Boot",
    "MySQL",
    "Angular"
  ],
  "jobs": [
    {
      "job": "Java Backend Developer",
      "company": "TechNova Solutions",
      "location": "Chennai",
      "salary": 60000
    },
    {
      "job": "Spring Boot Developer",
      "company": "CloudWorks Technologies",
      "location": "Bangalore",
      "salary": 70000
    }
  ]
}
```

## Recommendation Query

The recommendation is based on the graph relationship:

``` cypher
MATCH (u:User {id: $userId})
      -[:HAS_SKILL]->(s:Skill)
      <-[:REQUIRES]-(j:Job)
      -[:OFFERED_BY]->(c:Company)

RETURN DISTINCT
    j.title AS job,
    c.name AS company,
    j.location AS location,
    j.salary AS salary
```

The `$userId` value comes from the API request.

## Creating Test Users

Example User 2:

``` cypher
CREATE (u:User {
    id: 2,
    name: "Arun Kumar"
})
```

Add skills:

``` cypher
MATCH (u:User {id: 2})
CREATE
    (s1:Skill {name: "Java"}),
    (s2:Skill {name: "React"}),
    (s3:Skill {name: "PostgreSQL"})

CREATE
    (u)-[:HAS_SKILL]->(s1),
    (u)-[:HAS_SKILL]->(s2),
    (u)-[:HAS_SKILL]->(s3)
```

For a new user to receive recommendations, jobs must have matching
`REQUIRES` relationships to the user's skills.

## Local Backend Setup

### Requirements

-   Java 21
-   Maven
-   Neo4j/Cognodb database

### Configure Neo4j

Configure the Neo4j connection in the backend configuration.

Example:

``` java
Driver driver = GraphDatabase.driver(
    "bolt+s://YOUR_NEO4J_HOST",
    AuthTokens.basic("YOUR_USERNAME", "YOUR_PASSWORD")
);
```

Do not commit real database passwords or secrets to GitHub.

### Run the Backend

From the backend project directory:

``` powershell
mvn clean package
```

Then run:

``` powershell
mvn spring-boot:run
```

The backend normally runs on:

``` text
http://localhost:8080
```

## Local Frontend Setup

Go to the Angular frontend directory:

``` powershell
npm install
```

Start Angular:

``` powershell
ng serve
```

Open:

``` text
http://localhost:4200
```

Enter a User ID and click **Find Jobs**.

## Deployment

### Backend

The Spring Boot backend is deployed on Render.

Backend URL:

``` text
https://job-recommendation-backend-6nfw.onrender.com
```

### Frontend

The Angular frontend is deployed on Vercel.

The frontend must use the deployed backend API URL instead of:

``` text
http://localhost:8080
```

Example:

``` typescript
private apiUrl =
  'https://job-recommendation-backend-6nfw.onrender.com/api/jobs/recommendations';
```

## CORS

When the Angular frontend and Spring Boot backend are deployed on
different domains, CORS must allow the frontend domain.

Example Spring Boot configuration:

``` java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "http://localhost:4200",
                            "https://YOUR-FRONTEND.vercel.app"
                        )
                        .allowedMethods(
                            "GET",
                            "POST",
                            "PUT",
                            "DELETE",
                            "OPTIONS"
                        );
            }
        };
    }
}
```

Replace `YOUR-FRONTEND.vercel.app` with the actual deployed frontend
domain.

## Project Structure

### Backend

``` text
job-recommendation-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/jobrecommendation/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       └── JobRecommendationBackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   ├── test/
│   └── pom.xml
├── mvnw
├── mvnw.cmd
└── pom.xml
```

### Frontend

``` text
job-recommendation-frontend/
├── src/
│   ├── app/
│   │   ├── services/
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   └── main.ts
├── public/
├── angular.json
├── package.json
└── README.md
```

## Git Commands

After making changes:

``` powershell
git status
git add .
git commit -m "Update job recommendation project"
git push origin main
```

Vercel and Render can then automatically deploy the latest changes when
automatic deployments are enabled.

## Important Security Notes

Never upload these to GitHub:

``` text
Neo4j password
API keys
Private tokens
Database credentials
Secret keys
```

Use environment variables for production secrets.

## Future Improvements

-   User login and registration
-   Job search and filtering
-   Skill-based recommendation score
-   Job application feature
-   Admin dashboard
-   Pagination
-   Better UI/UX
-   JWT authentication
-   More advanced recommendation algorithms
-   User profile editing

## Author

**Elayabharathi**

Job Recommendation System built using Angular, Spring Boot, Java and
Neo4j.
