# Cloud-Based REST API

A scalable cloud-based REST API built with Next.js and Supabase that accepts, stores, and retrieves JSON data. This project demonstrates modern serverless architecture, database integration, and Infrastructure as Code practices.

## 🏗️ Architecture

- **Frontend/API**: Next.js 14 with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (ready for deployment)
- **IaC**: Terraform configuration
- **Validation**: Zod schemas for type safety

## 🚀 Features

- **RESTful API** with full CRUD operations
- **JSON data storage** with flexible schema
- **Input validation** using Zod
- **Error handling** with proper HTTP status codes
- **Pagination** and filtering support
- **Database indexing** for optimal performance
- **Row Level Security** (RLS) policies
- **TypeScript** for type safety
- **Comprehensive testing** with Postman collection

## 📋 API Endpoints

### POST /api/data
Store JSON data in the database.

**Request:**
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

**Response:**
```json
{
  "success": true,
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Data saved successfully"
}
```

### GET /api/data
Retrieve all data with optional pagination and filtering.

**Request:**
```bash
curl "http://localhost:3000/api/data?limit=10&offset=0&filter=name,John"
```

**Response:**
```json
{
  "data": [...],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

### GET /api/data/[id]
Retrieve specific data by UUID.

**Request:**
```bash
curl http://localhost:3000/api/data/123e4567-e89b-12d3-a456-426614174000
```

### DELETE /api/data/[id]
Delete specific data by UUID.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/data/123e4567-e89b-12d3-a456-426614174000
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone and Install
```bash
git clone <repository-url>
cd cloud-rest-api
npm install
```

### 2. Environment Configuration
Copy `.env.local.example` to `.env.local` and update with your Supabase credentials:

```bash
cp .env.local.example .env.local
```

### 3. Database Setup
The database schema is automatically created. If you need to run it manually:

```sql
-- Run the contents of database/schema.sql in your Supabase SQL editor
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 🧪 Testing

### Automated Testing
```bash
# Run the test script
./scripts/test-api.sh

# Or test with a different base URL
./scripts/test-api.sh https://your-deployed-api.vercel.app
```

### Manual Testing with cURL
```bash
# Create data
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'

# Get all data
curl http://localhost:3000/api/data

# Get data by ID
curl http://localhost:3000/api/data/[UUID]
```

### Postman Collection
Import `postman/Cloud-REST-API.postman_collection.json` into Postman for comprehensive API testing.

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy automatically on push to main branch

### Infrastructure as Code
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## 📊 Database Schema

```sql
CREATE TABLE user_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Input validation** with Zod schemas
- **Environment variable protection** for sensitive data
- **Service role isolation** for admin operations
- **CORS configuration** for production use

## 📈 Performance Optimizations

- **JSONB indexing** for fast queries
- **Connection pooling** via Supabase
- **Serverless architecture** for auto-scaling
- **Edge deployment** with Vercel

## 🧰 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **IaC**: Terraform

## 📝 Project Structure

```
├── app/
│   ├── api/data/           # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── database/
│   └── schema.sql          # Database schema
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── validation.ts       # Zod schemas
├── postman/                # API testing collection
├── scripts/
│   └── test-api.sh         # Test script
├── terraform/              # Infrastructure as Code
└── tests/                  # Test files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Iskandar**