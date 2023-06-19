import puppeteer from "@cloudflare/puppeteer";
import BaseService from "../common/base-service";

interface IMediaGeerationRecord {
    MediaGenerationId: Number,
    CreateDateTimeUtc: Date,
    UpdatedDateTimeUtc: Date,
    MediaStatusId: MediaStatus,
    MediaTypeId: MediaType,
    Html: string,
    IsPrivate: Number,
    MediaId: Number
}

interface IBody {
    mediaGenerationId: number,
    width: number,
    height: number,
    quality: number,
    type: "jpeg" | "png" | "webp" | undefined
}

enum MediaStatus {
    enabled = 1,
    disabled = 2,
    pending = 3,
    generated = 4
}

enum MediaType {
    image = 1,
    video = 2,
    pdf = 3
}

export class ScreenshotReponse {

}

class GeneratedRespose {

}


export default class ImageService extends BaseService {
    constructor(env: any) {
        super(env);
    }

    public async generateScreenshotAsync(body: IBody): Promise<ScreenshotReponse> {

        if (!body.mediaGenerationId) {
            throw new Error('MediaGenerationId Not Found');
        }
        try {
            let  result: IMediaGeerationRecord = await this.DB.prepare(
                `SELECT * 
                FROM media_generation
                WHERE MediaGenerationId = ?`
            )
                .bind(body.mediaGenerationId)
                .first();

            if (result) {

                if (result.MediaTypeId == MediaType.image) {

                    switch (result.MediaStatusId) {
                        case MediaStatus.pending:
                            const imageResponse = await this.generateImageAsyn(result.Html, body.type, body.width, body.height);
                            break;
                        case MediaStatus.generated:
                            const generatedResponse = await this.getGeneratedImageAsync(body.mediaGenerationId)
                            break;
                        default:
                            break
                    }

                }
            } else {
                throw new Error('Unabled to get data for media generation')
            }
        }
        catch (e: any) {
            if (e.cause) {
                console.error(e.cause)
            } else {
                console.error(e)
            }
            throw e;
        }


        return new ScreenshotReponse();
    }

    async generateImageAsyn(html: string, type: "jpeg" | "png" | "webp" | undefined, width: number, height: number): Promise<string | Buffer> {

        console.warn('generateImageAsyn',html, type, width, height)
        // const puppeteer = new puppeteer();
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        // Set the viewport size
        await page.setViewport({ width, height });

        // Set the HTML content of the page
        await page.setContent(html);

        // Take a screenshot of the page
        const imageBuffer = await page.screenshot({ type });

        await browser.close();

        return imageBuffer;
    }

    async getGeneratedImageAsync(mediaGenerationId: Number): Promise<GeneratedRespose> {
        return new GeneratedRespose();
    }
}



