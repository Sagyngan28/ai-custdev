# 🚀 Deployment Guide - AI CustDev Simulator

## 📋 Pre-deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Components properly typed
- [ ] Error boundaries implemented
- [ ] Loading states handled

### ✅ Database Setup
- [ ] Neon database created
- [ ] Migration script executed (`npm run db:setup`)
- [ ] Database connection tested
- [ ] Environment variables configured

### ✅ API Integration
- [ ] GLM-4.5-Flash API key obtained (optional)
- [ ] Fallback mode tested
- [ ] All API endpoints functional
- [ ] Health check endpoint working

### ✅ Performance
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Animations smooth on all devices

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)

**Why Vercel:**
- Native Next.js support
- Automatic deployments
- Edge functions
- Built-in analytics
- Free tier available

**Steps:**
1. Connect GitHub repository to Vercel
2. Configure environment variables:
   ```
   DATABASE_URL=your_neon_connection_string
   GLM_API_KEY=your_glm_api_key (optional)
   GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```
3. Deploy automatically on push to main branch

**Build Command:** `npm run build`
**Output Directory:** `.next`

### 2. Netlify

**Steps:**
1. Connect repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in site settings
5. Enable Next.js runtime

### 3. Railway

**Steps:**
1. Connect GitHub repository
2. Railway auto-detects Next.js
3. Add environment variables
4. Deploy with one click

### 4. Self-hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Environment Variables

### Required
```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
```

### Optional
```env
GLM_API_KEY="your_api_key"
GLM_API_URL="https://open.bigmodel.cn/api/paas/v4/chat/completions"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

## 🔍 Post-deployment Testing

### 1. Health Check
Visit: `https://your-app.com/api/health`

Expected response:
```json
{
  "status": "healthy",
  "services": {
    "database": { "status": "connected" },
    "glm": { "status": "configured" }
  }
}
```

### 2. Functionality Test
1. **Homepage**: Form submission works
2. **Survey Creation**: Database writes successful
3. **GLM Integration**: Segments generated (or fallback)
4. **Dashboard**: Charts render correctly
5. **Export**: CSV/Excel downloads work
6. **Theme Toggle**: Dark/light mode switching

### 3. Performance Test
- **Lighthouse Score**: Aim for 90+ performance
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Check with `npm run build`

## 🐛 Common Issues & Solutions

### Build Errors

**Error: Module not found**
```bash
npm install
npm run build
```

**Error: TypeScript compilation**
```bash
npx tsc --noEmit
```

### Runtime Errors

**Database Connection Failed**
- Verify DATABASE_URL format
- Check Neon database status
- Ensure SSL mode is enabled

**GLM API Errors**
- Verify API key is correct
- Check API quota/limits
- Fallback mode should activate automatically

### Performance Issues

**Slow Loading**
- Enable compression in hosting platform
- Optimize images with Next.js Image component
- Use dynamic imports for heavy components

**Memory Issues**
- Check for memory leaks in useEffect
- Optimize large datasets
- Use pagination for results

## 📊 Monitoring & Analytics

### Built-in Monitoring
- Health check endpoint: `/api/health`
- Error boundaries catch React errors
- Console logging for debugging

### Recommended Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Google Analytics**: User behavior tracking

### Custom Metrics
Track key metrics:
- Survey creation rate
- GLM API success rate
- Export usage
- Error rates by component

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run test:app
```

### Deployment Strategy
1. **Development**: Feature branches
2. **Staging**: Deploy to staging environment
3. **Production**: Deploy main branch after testing

## 🔐 Security Considerations

### Environment Variables
- Never commit `.env.local` to git
- Use platform-specific secret management
- Rotate API keys regularly

### Database Security
- Use connection pooling
- Enable SSL/TLS
- Regular backups
- Monitor for unusual activity

### API Security
- Rate limiting on API endpoints
- Input validation
- CORS configuration
- Error message sanitization

## 📈 Scaling Considerations

### Database
- Neon auto-scales compute
- Monitor connection limits
- Consider read replicas for high traffic

### API Limits
- GLM API has rate limits
- Implement caching for repeated requests
- Queue system for high volume

### Frontend
- CDN for static assets
- Edge caching for API responses
- Progressive loading for large datasets

## 🎯 Success Metrics

### Technical KPIs
- Uptime: 99.9%
- Response time: < 2s
- Error rate: < 1%
- Build time: < 5min

### Business KPIs
- User engagement
- Survey completion rate
- Export usage
- GLM API utilization

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Monitor error rates
- [ ] Update dependencies monthly
- [ ] Review performance metrics
- [ ] Backup database regularly
- [ ] Test GLM API connectivity

### Emergency Contacts
- Database: Neon support
- Hosting: Platform support
- GLM API: GLM support team

---

🎉 **Your AI CustDev Simulator is ready for production!**
