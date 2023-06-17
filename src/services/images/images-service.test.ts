import { describe, expect, it, beforeAll, afterAll } from "vitest";
import ImageService from "./images-service";

describe("ImageService", () => {
  let imageService: ImageService;

  beforeAll(async () => {
    imageService = new ImageService({
      auctionpresentor: {}
    });
  });

  afterAll(async () => {

  });


  it("should throw an error when mediaGenerationId is not present", async () => {
    const body = {}; // Empty body without mediaGenerationId
    await expect(async () => {
      await imageService.generateScreenshotAsync(body)
    }).rejects.toThrow(
      'MediaGenerationId Not Found'
    );
  });
}); 
