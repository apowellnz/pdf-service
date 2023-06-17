import BaseService from "../common/base-service";

export default class PdfService extends BaseService {
    constructor(env:any) {
        super(env);
    }

    public async generatePDFAsync(body: any): Promise<PdfReponse> {
		throw new Error("Method not implemented.");
	}
}


export class PdfReponse {
    
}