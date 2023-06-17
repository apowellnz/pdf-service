import BaseService from "../common/base-service";

interface IMediaGeerationRecord {
    MediaGenerationId:Number,
    CreateDateTimeUtc:Date,
    UpdatedDateTimeUtc:Date,
    MediaStatusId:MediaStatus,
    MediaTypeId:MediaType,
    Html:String,
    IsPrivate:Number,
    MediaId:Number
}

interface IBody {
    mediaGenerationId:Number
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

export default class ImageService extends BaseService {
    constructor(env: any) {
        super(env);
    }

    public async generateScreenshotAsync(body: IBody): Promise<ScreenshotReponse | null> {

        if (!body.mediaGenerationId) {
            throw new Error('MediaGenerationId Not Found');
        }
        try {
            const result: IMediaGeerationRecord = await this.DB.prepare(
                `SELECT * 
                FROM media_generation
                WHERE MediaGenerationId = ?`
            )
                .bind(body.mediaGenerationId)
                .first();

            if (result) {

                if(result.MediaTypeId == MediaType.image) {

                    switch(result.MediaStatusId) {
                        case MediaStatus.pending:
                            break;
                        case MediaStatus.generated:
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
            return null;
        }


        return new ScreenshotReponse();
    }
}



