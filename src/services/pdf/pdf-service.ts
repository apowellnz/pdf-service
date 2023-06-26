import puppeteer from "@cloudflare/puppeteer";
import BaseService from "../common/base-service";
import streamToBuffer from 'stream-to-buffer';

export default class PdfService extends BaseService {
    constructor(env:any) {
        super(env);
    }

    /**
     * Will geneate PDF document
     * NOTE: PDF generation is currently not support by cloudflare at this time.
     * @param html html string to generate
     * @param width width of document
     * @param height height of document
     * @returns Buffer of generated PDF
     */
    public async generatePDFAsync(html: string, width: number, height: number): Promise<string | Buffer> {
            const browser = await puppeteer.launch(this.$env.MYBROWSER);
            const page = await browser.newPage();
    
            // Set the viewport size
            await page.setViewport({ width, height });
    
            // Set the HTML content of the page
            await page.setContent(html, {
                waitUntil:"networkidle0"
            });
    
    
            // get stream
            const pdfStream = await page.createPDFStream({ format: 'a4', width, height });
            
            // convert stream to buffer
            const pdfBuffer = await streamToBuffer(pdfStream);
          
            await browser.close();
          
            return pdfBuffer;
	}
}


export class PdfReponse {
    
}