# Deployment Guide

This guide covers deploying the ISO 9001 Self-Assessment & Audit Management application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Environment Variables](#environment-variables)
- [Manual Deployment](#manual-deployment)
- [Database Setup](#database-setup)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Production Considerations](#production-considerations)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For Docker Deployment

- Docker 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum (4GB recommended)
- 10GB disk space

### For Manual Deployment

- Node.js 20 LTS
- PostgreSQL 15+
- npm 9+
- PM2 or systemd (optional, for process management)

---

## Quick Start with Docker

The fastest way to deploy is using Docker Compose.

### 1. Clone and Configure

```bash
# Clone the repository
git clone <repository-url>
cd Selfassesment-app

# Copy the example environment file
cp .env.docker.example .env
```

### 2. Configure Environment

Edit `.env` and set secure values:

```bash
# REQUIRED: Generate secure secrets (at least 32 characters)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_REFRESH_SECRET=your-refresh-token-secret-minimum-32-characters
ENCRYPTION_KEY=your-32-character-encryption-key

# REQUIRED: Set secure database password
POSTGRES_PASSWORD=change-this-secure-password

# OPTIONAL: Update if using custom domain
CORS_ORIGIN=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### 3. Start Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service health
docker-compose ps
```

### 4. Initialize Database

```bash
# Run database migrations
docker-compose exec backend npx prisma db push

# Seed initial data (optional)
docker-compose exec backend npx prisma db seed
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

Default admin credentials (if seeded):
- Email: `admin@example.com`
- Password: `admin123`

**Important:** Change the admin password immediately after first login.

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?schema=public` |
| `JWT_SECRET` | Secret for signing access tokens (min 32 chars) | `your-super-secret-jwt-key...` |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens (min 32 chars) | `your-refresh-token-secret...` |
| `ENCRYPTION_KEY` | 32-character key for data encryption | `your-32-character-encrypt...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Backend server port | `3001` |
| `JWT_EXPIRES_IN` | Access token expiry | `24h` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Max upload size in bytes | `10485760` (10MB) |
| `UPLOAD_DIR` | Directory for file uploads | `./uploads` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | `http://localhost:3001/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `ISO 9001 Audit Management` |

### PostgreSQL Variables (Docker only)

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | Database username | `iso9001` |
| `POSTGRES_PASSWORD` | Database password | (required) |
| `POSTGRES_DB` | Database name | `iso9001_audit` |

---

## Manual Deployment

For deployment without Docker.

### 1. Install Dependencies

```bash
# Backend
cd backend
npm ci --only=production

# Generate Prisma client
npx prisma generate

# Build TypeScript
npm run build

# Frontend
cd ../frontend
npm ci --only=production
npm run build
```

### 2. Configure Environment

Create `.env` files in both `backend/` and `frontend/` directories:

**backend/.env:**
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/iso9001_audit?schema=public"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_REFRESH_SECRET="your-refresh-token-secret-minimum-32-characters"
ENCRYPTION_KEY="your-32-character-encryption-key"
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-domain.com
```

**frontend/.env.local:**
```bash
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_APP_NAME="ISO 9001 Audit Management"
```

### 3. Database Setup

```bash
cd backend

# Push schema to database
npx prisma db push

# Seed initial data (optional)
npm run db:seed
```

### 4. Start with PM2

Install PM2 globally:
```bash
npm install -g pm2
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'iso9001-backend',
      cwd: './backend',
      script: 'dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'iso9001-frontend',
      cwd: './frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

Start services:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Configure auto-start on reboot
```

### 5. Start with systemd (Alternative)

Create service files:

**/etc/systemd/system/iso9001-backend.service:**
```ini
[Unit]
Description=ISO 9001 Backend API
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/Selfassesment-app/backend
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
Environment=NODE_ENV=production
EnvironmentFile=/path/to/Selfassesment-app/backend/.env

[Install]
WantedBy=multi-user.target
```

**/etc/systemd/system/iso9001-frontend.service:**
```ini
[Unit]
Description=ISO 9001 Frontend
After=network.target iso9001-backend.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/Selfassesment-app/frontend
ExecStart=/usr/bin/npx next start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable iso9001-backend iso9001-frontend
sudo systemctl start iso9001-backend iso9001-frontend
```

---

## Database Setup

### Initial Setup

1. **Create Database:**
```sql
CREATE DATABASE iso9001_audit;
CREATE USER iso9001 WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE iso9001_audit TO iso9001;
```

2. **Apply Schema:**
```bash
cd backend
npx prisma db push
```

3. **Seed Data (Optional):**
```bash
npm run db:seed
```

This creates:
- Default organization
- Admin user (admin@example.com / admin123)
- Sample users (Quality Manager, Internal Auditor)
- ISO 9001:2015 sections (73 sections)
- Sample audit questions (27 questions)
- Sample assessment with responses

### Database Migrations

For production schema updates:

```bash
# Create a migration (development)
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy
```

### Backup and Restore

**Backup:**
```bash
pg_dump -U iso9001 -h localhost iso9001_audit > backup.sql
```

**Restore:**
```bash
psql -U iso9001 -h localhost iso9001_audit < backup.sql
```

**Docker backup:**
```bash
docker-compose exec postgres pg_dump -U iso9001 iso9001_audit > backup.sql
```

---

## SSL/TLS Configuration

### Using Nginx as Reverse Proxy

1. **Install Nginx and Certbot:**
```bash
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Configure Nginx:**

**/etc/nginx/sites-available/iso9001:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # File upload settings
        client_max_body_size 10M;
    }
}
```

3. **Enable site and obtain certificate:**
```bash
sudo ln -s /etc/nginx/sites-available/iso9001 /etc/nginx/sites-enabled/
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

### Update Environment Variables

After setting up SSL, update:
```bash
CORS_ORIGIN=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

## Production Considerations

### Security Checklist

- [ ] Change default admin password after first login
- [ ] Use strong, unique secrets for JWT_SECRET, JWT_REFRESH_SECRET, ENCRYPTION_KEY
- [ ] Set secure POSTGRES_PASSWORD
- [ ] Configure CORS_ORIGIN to your exact domain
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall (allow only 80, 443)
- [ ] Set up regular database backups
- [ ] Review rate limiting settings

### File Storage

The application stores uploaded evidence files locally in the `/uploads` directory.

**For production, consider:**
- AWS S3 or Azure Blob Storage
- Persistent volume mounts for Docker
- Regular backup of uploads directory

**Docker volume backup:**
```bash
docker run --rm -v iso9001_uploads_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/uploads-backup.tar.gz -C /data .
```

### Scaling

For high availability:

1. **Backend:** Use PM2 cluster mode or multiple container replicas
2. **Frontend:** Deploy to CDN (Vercel, Cloudflare Pages) or use multiple replicas
3. **Database:** Use managed PostgreSQL (AWS RDS, Azure Database, etc.)
4. **Load Balancer:** Configure Nginx or cloud load balancer

---

## Monitoring

### Health Checks

The backend exposes health check endpoints:

- `GET /api/health` - Basic health status
- `GET /api/health/ready` - Kubernetes readiness probe

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-02T10:00:00.000Z",
  "version": "1.0.0",
  "database": "connected",
  "uptime": 3600
}
```

### Logging

Logs are output to stdout/stderr. For Docker:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

For PM2:
```bash
pm2 logs iso9001-backend
pm2 logs iso9001-frontend
```

### Recommended Monitoring Tools

- **Application:** PM2 monitoring, New Relic, Datadog
- **Infrastructure:** Prometheus + Grafana
- **Logs:** ELK Stack, Loki, CloudWatch Logs
- **Uptime:** UptimeRobot, Pingdom

---

## Troubleshooting

### Common Issues

#### Container won't start

```bash
# Check logs
docker-compose logs backend

# Common causes:
# - DATABASE_URL incorrect
# - Missing required environment variables
# - Port already in use
```

#### Database connection failed

```bash
# Verify PostgreSQL is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U iso9001 -d iso9001_audit -c "SELECT 1"

# Check DATABASE_URL format
# Correct: postgresql://user:pass@host:5432/db?schema=public
```

#### Prisma errors

```bash
# Regenerate Prisma client
docker-compose exec backend npx prisma generate

# Reset database (WARNING: deletes all data)
docker-compose exec backend npx prisma db push --force-reset
```

#### Frontend can't connect to API

1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check CORS_ORIGIN matches frontend URL
3. Ensure backend is running: `curl http://localhost:3001/api/health`

#### File uploads failing

1. Check `MAX_FILE_SIZE` environment variable
2. Verify uploads directory exists and has write permissions
3. For Nginx, check `client_max_body_size` directive

#### Health check failing

```bash
# Check if backend is responding
curl http://localhost:3001/api/health

# If database error, check connection
docker-compose exec backend npx prisma db execute --stdin <<< "SELECT 1"
```

### Reset Everything

```bash
# Stop and remove all containers, volumes, networks
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Getting Help

1. Check logs for specific error messages
2. Review environment variable configuration
3. Ensure all prerequisites are met
4. Open an issue at the project repository

---

## Quick Reference

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View logs |
| `docker-compose ps` | Check service status |
| `docker-compose exec backend sh` | Shell into backend |
| `docker-compose build --no-cache` | Rebuild images |

### Database Commands

| Command | Description |
|---------|-------------|
| `npx prisma db push` | Apply schema changes |
| `npx prisma migrate deploy` | Run migrations |
| `npx prisma db seed` | Seed database |
| `npx prisma studio` | Open database GUI |
| `npx prisma generate` | Regenerate client |

### Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001/api |
| Health Check | http://localhost:3001/api/health |
| PostgreSQL | localhost:5432 |
