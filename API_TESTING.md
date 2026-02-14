# API Testing Guide

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Create Job Application
**POST** `/jobs/apply`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "position": "Software Engineer",
  "experience": "3 years",
  "coverLetter": "I am very interested in this position..."
}
```

**Response:** (201 Created)
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "position": "Software Engineer",
  "experience": "3 years",
  "coverLetter": "I am very interested in this position...",
  "createdAt": "2024-01-29T10:30:00.000Z"
}
```

### 2. Get All Job Applications
**GET** `/jobs`

**Response:** (200 OK)
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "position": "Software Engineer",
    "experience": "3 years",
    "coverLetter": "I am very interested in this position...",
    "createdAt": "2024-01-29T10:30:00.000Z"
  }
]
```

### 3. Get Job Application by ID
**GET** `/jobs/:id`

Example: `GET /jobs/1`

**Response:** (200 OK)
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "position": "Software Engineer",
  "experience": "3 years",
  "coverLetter": "I am very interested in this position...",
  "createdAt": "2024-01-29T10:30:00.000Z"
}
```

### 4. Delete Job Application
**DELETE** `/jobs/:id`

Example: `DELETE /jobs/1`

**Response:** (204 No Content)

---

## Testing with cURL

### Create Application
```bash
curl -X POST http://localhost:3000/jobs/apply \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "position": "Software Engineer",
    "experience": "3 years",
    "coverLetter": "I am interested in this position"
  }'
```

### Get All Applications
```bash
curl http://localhost:3000/jobs
```

### Get Application by ID
```bash
curl http://localhost:3000/jobs/1
```

### Delete Application
```bash
curl -X DELETE http://localhost:3000/jobs/1
```

---

## Testing with Postman

1. **Create a new request**
2. **Set the method** (GET, POST, DELETE)
3. **Enter the URL** (e.g., `http://localhost:3000/jobs/apply`)
4. **For POST requests:**
   - Go to "Body" tab
   - Select "raw"
   - Choose "JSON" from dropdown
   - Paste the JSON data
5. **Click "Send"**

---

## Validation Rules

The API validates the following:

### Required Fields:
- `fullName` - Must be a string
- `email` - Must be a valid email format
- `phone` - Must be a string
- `position` - Must be a string

### Optional Fields:
- `experience` - String (optional)
- `coverLetter` - String (optional)

### Error Response Example:
```json
{
  "statusCode": 400,
  "message": [
    "Email is required",
    "Invalid email format"
  ],
  "error": "Bad Request"
}
```

---

## Database Verification

You can verify the data in MySQL Workbench:

```sql
-- View all applications
SELECT * FROM jobs;

-- View specific application
SELECT * FROM jobs WHERE id = 1;

-- Count applications
SELECT COUNT(*) FROM jobs;

-- View recent applications
SELECT * FROM jobs ORDER BY createdAt DESC LIMIT 10;
```
