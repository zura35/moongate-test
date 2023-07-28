```
curl -X POST http://localhost:8000/tasks \
   -H 'Content-Type: application/json' \
   -d '{"title":"Some Task 1", "description":"This is a task."}'

curl -X PUT http://localhost:8000/tasks/cbc0b9e0-1e8b-42be-acd1-9ae6586f79bf \
   -H 'Content-Type: application/json' \
   -d '{"title":"Updated Task 1", "description":"This is an updated task."}'

curl -X DELETE http://localhost:8000/tasks/cbc0b9e0-1e8b-42be-acd1-9ae6586f79bf
```