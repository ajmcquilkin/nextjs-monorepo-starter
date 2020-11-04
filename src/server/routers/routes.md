# Routes Overview

An overview of the basic route layout of this server

```
server (/)
│
```

## Authentication Flow

Users when receiving a 401 unauthenticated will be redirected to /api/auth/login, which will redirect them to CAS. They will then have a session cookie which is passed to the frontend and backend for all requests. 