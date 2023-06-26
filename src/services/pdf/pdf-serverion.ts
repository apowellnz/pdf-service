import puppeteer from "@cloudflare/puppeteer";
import BaseService from "../common/base-service";

export default class PdfService extends BaseService {
    constructor(env:any) {
        super(env);
    }

    public async generatePDFAsync(html: string, width: number, height: number): Promise<string | Buffer> {
            const browser = await puppeteer.launch(this.$env.MYBROWSER);
            const page = await browser.newPage();
    
            // Set the viewport size
            await page.setViewport({ width, height });
    
            // Set the HTML content of the page
            await page.setContent(html, {
                waitUntil:"networkidle0"
            });
    
    
            const pdfBuffer = await page.createPDFStream({format:'a4', width, height }); // todo convert Promise<internal.Readable> into Buffer
    
            await browser.close();
    
            return pdfBuffer;
	}
}


export class PdfReponse {
    
}