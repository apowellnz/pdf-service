# pdf-service (PDF Worker )

## To Run
```
npm instal

Wrangler Dev
```

## To Publish to production
```
Wrangler publish
``` 

## To publish to development
```
Wrangler publish -env development
```
NOTE: The 2 different environments will count towards the total allow worker scripts of the account. So don't go too change with environments before considering this.

## Description

Cloudflare worker for generation PDFs and Screenshots from HTML. 

---

### Integrations

Integrates with the d1 database binding. This is inorder to process requests. As HTML will be sorted on the database. 

