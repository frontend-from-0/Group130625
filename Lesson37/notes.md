## Important to understand

### Persistence vs. Volatility: 
Variables in Node.js/NextJs disappear when the server restarts. The database is the long-term memory.

### The Request/Response Cycle:
Frontend (React/HTML) sends a request → Backend (Node/Express) receives it → Database (MongoDB) stores/finds it → Backend formats it → Frontend displays it.

### CRUD is the Universal Language

Regardless of the DB, they are always doing four things: Create, Read, Update, and Delete.


## SQL vs. NoSQL: The Core Trade-offs

### SQL (Relational)
- Tables with fixed rows and columns.
- Strict schema: You must define your columns before adding data.
- Relationships: Uses JOINs to link tables (excellent for complex logic).

### NoSQL (Document/MongoDB)
- JSON-like documents (BSON).
- Flexible schema: You can add new fields to one document without affecting others.
- Often uses Embedding (nesting data inside a document).


## Crucial MongoDB Concepts
- Documents are Objects: A single record in MongoDB is just a "Document," which looks exactly like a JavaScript object.

- Collections are Arrays: A "Collection" is just a giant array of those objects.

- The _id Field: Every document gets a unique ObjectId.

- Schema Flexibility vs. "Schema-less" Chaos: Just because MongoDB allows you to have different structures doesn't mean you should. We usually use libraries like Zod/Mongoose to enforce a schema so our data doesn't become a mess.

- Validation is Backend's Job: never trust the frontend. If a field is "required," it must be validated at the database/API level, not just on a form.

- Avoid accidentally making 100 database calls in a loop instead of one efficient call. It’s the #1 way to slow down an app.


