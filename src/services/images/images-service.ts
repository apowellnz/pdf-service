import puppeteer from "@cloudflare/puppeteer";
import BaseService from "../common/base-service";


export default class ImageService extends BaseService {
    constructor(env: any) {
        super(env);
    }

    /**
     * Will generate a screenshot of the HTML and return as buffer
     * @param html HTML to generate 
     * @param type JPEG or PNG. Note PNG is not currently support by cloudflare
     * @param width width of screenshot
     * @param height height of screenshot
     * @param quality quality of screenshot 0 to 100
     * @returns Buffer of generated screenshot
     */
    async generateImageAsyn(html: string, type: "jpeg" | "png" , width: number, height: number, quality:number): Promise<string | Buffer> {

        const browser = await puppeteer.launch(this.$env.MYBROWSER);
        const page = await browser.newPage();

        // Set the viewport size
        await page.setViewport({ width, height });

        // Set the HTML content of the page
        await page.setContent(html, {
            waitUntil:"networkidle0"
        });


        // Take a screenshot of the page
        const imageBuffer = (await page.screenshot({ type, quality})) as Buffer;

        await browser.close();

        return imageBuffer;
    }

}



