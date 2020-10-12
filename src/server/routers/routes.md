# Routes Overview

An overview of the basic route layout of this server

```
server (/)
│
├── /resources
│   ├── /
│   │   ├── GET -> get all resources (x)
│   │   ├── POST -> create a resource (x)
│   │
│   ├── /:id                                       // advanced (inquiries with token and id management)
│   │   ├── GET -> get specific resource (x)
│   │   ├── PUT -> update specific resource (x)
│   │   ├── DELETE -> delete specific resource (x)
```

## Authentication Flow

Users when receiving a 401 unauthenticated will be redirected to /api/login, which will redirect them to CAS. They will then have a session cookie which is passed to the frontend and backend for all requests. 