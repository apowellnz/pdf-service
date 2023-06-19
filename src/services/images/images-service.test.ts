import { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import ImageService from "./images-service";
import sinon from "sinon";

describe("ImageService", () => {
  let imageService: ImageService;
  let dbStub: sinon.SinonStub;
  let generateImageStub: sinon.SinonStub;
  let getGeneratedImageStub: sinon.SinonStub;

  let env: any = {
    auctionpresentor: {
      prepare: () => {}, // Dummy function to avoid errors
    },
  };

  beforeAll(async () => {
    imageService = new ImageService(env);
  });

  afterAll(async () => {
    // Clean up resources if necessary
  });

  beforeEach(() => {
    dbStub = sinon.stub(env.auctionpresentor, "prepare");
    generateImageStub = sinon.stub(imageService, "generateImageAsyn");
    getGeneratedImageStub = sinon.stub(imageService, "getGeneratedImageAsync");
  });

  afterEach(() => {
    dbStub.restore();
    generateImageStub.restore();
    getGeneratedImageStub.restore();
  });

  it("should call generateImageAsyn when MediaStatus is pending", async () => {
    // setup
    dbStub.returns({
      bind: sinon.stub().returns({
        first: sinon.stub().returns({
          MediaTypeId: 1, // MediaType.image
          MediaStatusId: 3, // MediaStatus.pending
          Html: "<html></html>",
        }),
      }),
    });

    const body = {
      mediaGenerationId: 1,
      type: "jpeg",
      width: 800,
      height: 600,
    };

    // act
    await imageService.generateScreenshotAsync(body);

    // assert
    expect(generateImageStub.calledOnce).toBeTruthy();
    expect(getGeneratedImageStub.called).toBeFalsy();
  });

  it("should call getGeneratedImageAsync when MediaStatus is generated", async () => {
    // setup
    dbStub.returns({
      bind: sinon.stub().returns({
        first: sinon.stub().returns({
          MediaTypeId: 1, // MediaType.image
          MediaStatusId: 4, // MediaStatus.generated
          Html: "<html></html>",
        }),
      }),
    });

    const body = {
      mediaGenerationId: 1,
      type: "jpeg",
      width: 800,
      height: 600,
    };

    // act
    await imageService.generateScreenshotAsync(body);

    // assert
    expect(generateImageStub.called).toBeFalsy();
    expect(getGeneratedImageStub.calledOnce).toBeTruthy();
  });

  it("should generate an image buffer when generateImageAsyn is called", async () => {
    // setup
    const html = "<html><body><h1>Hello, world!</h1></body></html>";
    const type = "jpeg";
    const width = 800;
    const height = 600;

    // act
    const imageBuffer = await imageService.generateImageAsyn(html, type, width, height);

    // assert
    
    expect(imageBuffer instanceof Buffer).toBeTruthy();
  });
});
