# CrowdTask
GovTech (CrowdTaskSG) Internship Assessment

## Assumptions made about the Project
1. NRIC follows the format \[S/T/G/F\]\[7 digits\]\[A-Z\]

2. Password needs to have at least 6 characters and contain both alphabets and numbers

3. Not possible to register with a date of birth that is in the future

4. User should only be able to retrieve his/her information after being authenticated, and others should not be able to view this information

## Application or Architectural decisions made
1. Sequelize is used for database interaction, which abstracts SQL queries and allows for object-oriented access to the database.

2. Many of the design choices were made with scalability in mind. For example, by implementing a ProtectedRoute and an auth middleware, these can then be reused to ensure consistency without code duplication.

3. Users should immediately be logged in after a successful registration instead of having to re-enter their login details for a more seamless user experience.

4. Upon an invalid login attempt, the user should not know whether the username or the password was incorrect, as that could allow brute-force approaches to jeopardise security.

5. Utilised the payload capabilities of JWT tokens to abstract user identity for added security when accessing API endpoints.

6. Implemented a context provider for authentication such that the user authentication state is easily accessible throughout the components of the app.

## Project Setup Instructions

This project uses Docker and Docker Compose to run a full-stack application with a React frontend, a Node.js backend, and a PostgreSQL database. To ensure that your application runs correctly with the appropriate environment variables, you need to create a `.env` file in the root directory of your project.

## Getting Started

### Step 1: Clone the Repository
Naivgate to where you want the project folder to be located at.
Open your terminal and run the following command:
```bash
git clone https://github.com/daronoh/crowdtask.git
```

### Step 2: Create a .env file
1. **Navigate to the Root Directory**: Make sure you are in the root directory of the project where your `docker-compose.yml` file is located.

2. **Create a .env File**: In the root directory, create a new file named `.env`.

3. **Add Environment Variables**: Open the `.env` file in your IDE and add the following environment variables:
```
REACT_APP_API_URL="http://localhost:5001" # port has to match the SERVER_PORT
SERVER_PORT=5001 # Or any other port you wish to use
PG_USER=username # Your postgreSQL username
PG_PASSWORD=password # Your postgreSQL password
PG_DB=crowdtask # Your database name
PG_HOST=postgres-db
PG_PORT=5432
SECRET_KEY=secret_key # Replace with your JWT secret key. Follow this instruction (https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4) to obtain your JWT Secret Key
```

### Step 3: Open up Docker 
Open up Docker and navigate to your project directory.

### Step 4: Build and Start the Docker Containers
Run the following command to build and start the Docker containers:
```bash
docker-compose up --build
```

### Step 5: Access the Application
Once the containers are running, you can access the application in your web browser:
- http://localhost:3000/

### Step 6: Configure the docker-compose.yml file (Optional)
If you would like to change any of the environment variables or container settings, you can do so
in either the `docker-compose.yaml` file or the `.env` file

