
# Security Policy

## Security Features

This application implements multiple security layers:

### 1. **Input Sanitization**
- All user inputs are sanitized to prevent XSS attacks
- Maximum length limits on all text fields
- HTML tag stripping on user-submitted content

### 2. **Rate Limiting**
- 100 requests per minute per IP address
- Automatic blocking of excessive requests
- Protection against brute force attacks

### 3. **Security Headers**
- X-Frame-Options: DENY (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restricts sensitive features

### 4. **Database Security**
- Prepared statements via Drizzle ORM (prevents SQL injection)
- Input validation using Zod schemas
- Proper error handling without exposing sensitive data

### 5. **Authentication Security**
- Google OAuth integration
- Session management with secure cookies
- Admin access control

### 6. **Payload Size Limits**
- 10MB maximum request size
- Prevents DoS attacks via large payloads

## Reporting Vulnerabilities

If you discover a security vulnerability, please email: fasih31@gmail.com

## Best Practices for Deployment

1. Always use HTTPS in production
2. Set strong SESSION_SECRET environment variable
3. Regularly update dependencies
4. Monitor application logs for suspicious activity
5. Implement CORS policies appropriate for your domain

---
**Designed and Secured by Fasih ur Rehman**
