# Learn GraphQL

This project demonstrates how to use GraphQL and a REST API (Todos API) to fetch and work with data.

---

## 🚀 What is GraphQL?

[GraphQL](https://graphql.org) is a **query language for your API** and a runtime for executing those queries with your existing data.

Instead of fixed REST endpoints that return entire objects, GraphQL lets clients request **exactly the fields they need** and nothing more.

---

### Why Use GraphQL?

GraphQL solves common problems like:

✅ **Over-fetching data**  
→ Only get the fields you need, not whole objects you might not use.

✅ **Under-fetching data**  
→ Fetch data for multiple objects in a single request instead of multiple REST calls.

✅ **Evolving APIs without breaking clients**  
→ Add new fields without breaking old queries.

✅ **Better developer experience**  
→ Tools like GraphiQL make it easy to explore and test your API.

---

### Example GraphQL Query

Example query to fetch a user:

```graphql
{
  user(id: "1") {
    id
    name
    email
  }
}
