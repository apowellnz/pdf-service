/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import ImageService from "./services/images/images-service";
import PdfService from "./services/pdf/pdf-serverion";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		try {
			const url = new URL(request.url);
			const body:any = await request.json();

			switch (url.pathname) {
				case '/screenshot':
					console.log('env in index', env)
					const imageService = new ImageService(env);

					if(!body.html) throw new Error(`No HTML provided in request`);
					if(!body.type) throw new Error(`No type provided in request`);
					if(!body.height) throw new Error(`No height provided in request`);
					if(!body.width) throw new Error(`No width provided in request`);
					

					const html = decodeURIComponent(body.html); 
					let imageData = await imageService.generateImageAsyn(html, body.type, body.height, body.width, body.quality )
					
					let contentType;
					let fileExtension;
					switch (body.type) {
					  case 'jpeg':
						contentType = 'image/jpeg';
						fileExtension = 'jpg';
						break;
					  case 'png':
						contentType = 'image/png';
						fileExtension = 'png';
						break;
					  case 'webp':
						contentType = 'image/webp';
						fileExtension = 'webp';
						break;
					  default:
						// Default to PNG if no valid type is specified
						contentType = 'image/png';
						fileExtension = 'png';
					}
					
					return new Response(imageData, {
					  headers: {
						'Content-Type': contentType,
						'Content-Disposition': `inline; filename="image.${fileExtension}"`
					  }
					});
	
				case '/pdf':
					// const pdfService = new PdfService(env);

					// let result = await pdfService.generatePDFAsync(body);

					// return new Response(JSON.stringify(result), {
					// 	status:200
					// });
					// break;
	
				default:
					return new Response('Not Found', {
						status: 404
					});
			}
		}
		catch(e: any) {
			if(e.cause) {
				console.error(e.cause)
			} else {
				console.log(e);
			}

			return new Response("Server Error", {
				status: 500
			});
		}
		
	},
};
