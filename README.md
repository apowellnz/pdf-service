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

# Cloudflare Support

There seems to be an issue with the natural support of puppeteer on cloudflare. Due to the nature of how cloudflare works, it doesn't like to host a headless browser on a worker. 
So in order to do this, an API needs to be enabled. This is currently in beta, and you need to request it to be enabled for your cloudflare account. 

I have done this, and requested it to be enabled for the account '[Omitted]'. I done this via discord on the cloudflare server. 
At the time of writting this, there was no support for PDF generation. No doubt this id due to the 15 second run time of workers and the extra strain this would put on the services. 

Continued...

I have got access now, and the JPEG screenshots work, but nothing else is supported by cloudflare. PDF generated does not allow the printing of a PDF, because I assume it requires a temp file which would not be supported by the provided cloudflare worker service. As they'll not pay for the temp file hosting... 

I have mocked out the code as it should be. So hopefully down the track they will support it.

**For references look:**
- [blog about it](https://blog.cloudflare.com/introducing-workers-browser-rendering-api/)
- [Application Form](https://www.cloudflare.com/en-gb/lp/workers-browser-rendering-api/)

