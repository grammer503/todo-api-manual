//// Todo API (Node.js with Express) ////

## Thought process and architecture
1. Data Model Design
   Use an array to store todo list in memory and each todo is an object with
   - id (unique identifier)
   - task (string)
   - datetime ( use moment.js for handle datetime parsing)
   - completed (boolean)

2. Technology
   - Use Node.js with Express for api developement and routing
   - Use Moment.js for parse format and handle datetime string

3. API Design
   - REST API
   - Identify todo by id (/todo/:id)

4. Error Handling
   - Return 404 when that requested todo not found
   - Return 201 when create new success and 204 if no content
   
## Installation

1. Clone this repo and install dependencies:
   npm install express
   npm install moment

2. Run the server:
   node index.ts
   
And then API will start at port 3000

## Example Requests 
//via postman

<!-- GET -->
URL: http://localhost:3000/todo


<!-- POST -->
URL: http://localhost:3000/todo
Example JSON:
{
    "task": "Go for dinner",
    "datetime": "26/08/2025 06:00 PM",
    "completed": false
}

<!-- PUT -->
URL: http://localhost:3000/todo/3
Example JSON:
{
    "task": "Read a book"
}

<!-- DELETE -->
Example URL: http://localhost:3000/todo/1