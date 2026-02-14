# Database Setup Guide

## Prerequisites
- MySQL Server installed on your machine
- MySQL Workbench (optional, for GUI management)

## Step 1: Start MySQL Server

### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Click on "Server" → "Start Server" (or use the status icon)
3. The server status should show "Running"

### Option B: Using Command Line (Windows)
```bash
# Start MySQL service
net start MySQL80

# Or if you have a different version
net start MySQL
```

### Option C: Using Services (Windows)
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MySQL80" (or your MySQL version)
4. Right-click and select "Start"

## Step 2: Create Database

The database `job_application` should already be created. If not:

```sql
CREATE DATABASE job_application;
```

## Step 3: Configure Database Connection

Edit the `.env` file in the backend root directory:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_DATABASE=job_application
```

**Important:** Replace `your_password_here` with your actual MySQL root password!

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Application

```bash
# Development mode with auto-reload
npm run start:dev

# Or regular start
npm start
```

## Step 6: Verify Connection

When you start the application, you should see:
- SQL queries in the console (because `logging: true`)
- A message indicating the table was created automatically
- "Application is running on: http://localhost:3000"

## Database Schema

The application will automatically create a `jobs` table with the following structure:

| Column       | Type         | Constraints           |
|--------------|--------------|----------------------|
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT |
| fullName     | VARCHAR(255) | NOT NULL             |
| email        | VARCHAR(255) | NOT NULL             |
| phone        | VARCHAR(255) | NOT NULL             |
| position     | VARCHAR(255) | NOT NULL             |
| experience   | VARCHAR(255) | NULLABLE             |
| coverLetter  | TEXT         | NULLABLE             |
| createdAt    | DATETIME     | AUTO-GENERATED       |

## Troubleshooting

### Error: "ER_NOT_SUPPORTED_AUTH_MODE"
This means MySQL is using a newer authentication method. Fix it:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Error: "Access denied for user 'root'@'localhost'"
- Check your password in the `.env` file
- Make sure MySQL server is running
- Verify your MySQL username and password

### Error: "Unknown database 'job_application'"
Create the database:
```sql
CREATE DATABASE job_application;
```

### Error: "connect ECONNREFUSED"
- MySQL server is not running
- Start the MySQL service (see Step 1)

## API Endpoints

Once running, you can test these endpoints:

- `POST /jobs` - Create a new job application
- `GET /jobs` - Get all job applications
- `GET /jobs/:id` - Get a specific job application
- `DELETE /jobs/:id` - Delete a job application

## Learning Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
