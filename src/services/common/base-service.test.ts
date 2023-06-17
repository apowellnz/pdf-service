import { describe, expect, it, beforeAll, afterAll } from "vitest";
import baseService from "./base-service";

class DumbyService extends baseService {
    constructor(env: any) {
        super(env)
    }
}

describe("BaseService Tests", () => {
    beforeAll(async () => {

    });

    afterAll(async () => {
    });

    it("should throw an error when env is not present", async () => {
        await expect(async () => {
            new DumbyService(null)
        }).rejects.toThrowError(
            'no this.$env configed for service'
        );
    });

    it("should throw an error when database is not present", async () => {
        await expect(async () => {
            new DumbyService({})
        }).rejects.toThrowError(
            'no database configed for service'
        );
    });

    it("should not throw an error when database is present", async () => {
        await expect(async () => {
            new DumbyService({
                auctionpresentor: {}
            })
        })
    });
});
