# MCP (Model Context Protocol) - AI Database Query System

## 📋 Overview

นี่คือ **MCP Server** ที่เชื่อมต่อ AI (Gemini) กับ Database โดยอนุญาตให้ AI สามารถค้นหาข้อมูลจากฐานข้อมูลได้อัตโนมัติ

## 🏗️ Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ HTTP Requests
       ▼
┌──────────────────────────────┐
│    Express Server            │
├──────────────────────────────┤
│  /chat   - Chat with AI      │
│  /mcp    - Direct MCP calls  │
└──────┬───────────────┬───────┘
       │               │
       ▼               ▼
┌─────────────┐  ┌────────────────┐
│ LLM Service │  │  Query Tool    │
│  (Gemini)   │  │  (Prisma ORM)  │
└──────┬──────┘  └────────┬───────┘
       │                  │
       └──────────┬───────┘
                  ▼
           ┌─────────────┐
           │  Database   │
           │ (PostgreSQL)│
           └─────────────┘
```

## 🛠️ Components

### 1. **Chat Router** (`/chat`)
- **Endpoint**: `POST /chat`
- **Description**: ส่งข้อความไปยัง AI ซึ่งจะประมวลผลและใช้เครื่องมือเพื่อตอบคำถาม
- **Request**:
  ```json
  {
    "message": "Find all users"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "reply": "AI response here..."
  }
  ```

### 2. **MCP Router** (`/mcp`)
- **Endpoint**: `POST /mcp`
- **Description**: เรียกเครื่องมือ MCP โดยตรง
- **Request**:
  ```json
  {
    "tool": "query",
    "input": {
      "model": "User",
      "action": "findMany",
      "args": {}
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "result": [...]
  }
  ```

## 🔧 Available Tools

### Tool: `query`
ใช้สำหรับค้นหาข้อมูลจากฐานข้อมูลโดยใช้ Prisma ORM

**Parameters:**
- `model` (string): ชื่อ Model ที่ต้องการค้นหา (เช่น "User", "Order")
- `action` (string): Prisma action ที่สามารถใช้ได้:
  - `findMany`: ค้นหาหลายรายการ
  - `findFirst`: ค้นหารายการแรก
  - `findUnique`: ค้นหารายการที่ไม่ซ้ำ
  - `count`: นับจำนวนรายการ

- `args` (object): Prisma query arguments
  - `where`: เงื่อนไขการค้นหา
  - `select`: เลือกฟิลด์ที่ต้องการ
  - `orderBy`: เรียงลำดับ
  - `take`: จำนวนรายการที่ต้องการ
  - `skip`: ข้ามจำนวนรายการ

**Example:**
```json
{
  "tool": "query",
  "input": {
    "model": "User",
    "action": "findMany",
    "args": {
      "where": { "email": "user@example.com" },
      "select": { "id": true, "email": true, "name": true },
      "take": 10
    }
  }
}
```

## 🚀 How It Works

### Flow: Chat with AI
1. **User** ส่งข้อความไปยัง `/chat`
2. **Chat Router** ตัวรับส่งเรียก `askAI()` function
3. **LLM (Gemini)** ประมวลผลข้อความและตัดสินใจว่าต้องการเรียก tool ใด
4. **MCP Server** เรียก `query` tool และ execute query
5. **Database** ส่งข้อมูลกลับมา
6. **AI** ประมวลผลผลลัพธ์และตอบกลับ
7. **Response** ส่งคำตอบกลับให้ user

### Flow: Direct MCP Call
1. **Client** ส่ง POST request ไปยัง `/mcp` พร้อม tool name และ input
2. **MCP Router** ตรวจสอบและเลือก tool ที่เหมาะสม
3. **Tool** execute และส่งผลลัพธ์กลับ
4. **Response** ส่งผลลัพธ์ให้ client

## 📦 Dependencies

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@prisma/adapter-pg": "^7.5.0",
    "@prisma/client": "^7.5.0",
    "express": "^5.2.1",
    "cors": "^2.8.6",
    "zod": "^4.3.6",
    "dotenv": "^17.3.1"
  }
}
```

## 🔒 Environment Variables

ต้องตั้งค่าใน `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/database
PORT=8080
```

## 📝 Example Usage

### cURL - Chat with AI
```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How many users are in the database?"}'
```

### cURL - Direct MCP Call
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "query",
    "input": {
      "model": "User",
      "action": "count",
      "args": {}
    }
  }'
```

### JavaScript Fetch
```javascript
const response = await fetch('http://localhost:8080/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Find all orders'
  })
});

const data = await response.json();
console.log(data.reply);
```

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your Gemini API key and database URL
```

### 3. Run Development Server
```bash
npm run dev
```

Server จะรัน on `http://localhost:8080`

## 📚 Project Structure

```
src/
├── index.ts              # Main server entry point
├── mcpRouter.ts          # MCP tool router
├── chatRouter.ts         # Chat endpoint router
├── lib/
│   ├── llm.ts           # Gemini AI integration
│   └── schemaReader.ts  # Database schema reader
└── tools/
    └── queryTool.ts     # Prisma query execution
```

## 🎯 Key Features

✅ **AI-Powered Queries** - Ask AI natural questions about your database
✅ **Automatic Tool Use** - AI decides when and how to use database tools
✅ **Type-Safe** - Full TypeScript support with Zod validation
✅ **Flexible Queries** - Support for complex Prisma queries
✅ **Error Handling** - Comprehensive error messages
✅ **Real-time Response** - Stream-based AI responses

## 🔐 Security Notes

- Always validate and sanitize inputs
- Use environment variables for sensitive data
- Restrict allowed models and actions in production
- Implement rate limiting for API endpoints
- Use HTTPS in production

## 🐛 Troubleshooting

### "Cannot find module" errors
- Run `npm install` to install all dependencies
- Check `tsconfig.json` has proper `moduleResolution`

### Database connection errors
- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running

### Gemini API errors
- Check `GEMINI_API_KEY` is valid
- Verify API key has proper permissions

## 📖 Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Express.js](https://expressjs.com/)