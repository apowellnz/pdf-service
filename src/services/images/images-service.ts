import puppeteer from "@cloudflare/puppeteer";
import BaseService from "../common/base-service";


export default class ImageService extends BaseService {
    constructor(env: any) {
        super(env);
    }

    async generateImageAsyn(html: string, type: "jpeg" | "png" | "webp" | undefined, width: number, height: number, quality:number): Promise<string | Buffer> {

        console.warn('generateImageAsyn',html, type, width, height)
        console.warn('this.$env',this.$env)
        // const puppeteer = new puppeteer();
        const browser = await puppeteer.launch(this.$env.MYBROWSER);
        const page = await browser.newPage();

        // Set the viewport size
        // await page.setViewport({ width, height });

        // Set the HTML content of the page
        // await page.setContent(html);

        await page.goto('https://www.google.com/');

        // Take a screenshot of the page
        const imageBuffer = (await page.screenshot()) as Buffer;

        await browser.close();

        return imageBuffer;
    }

}



