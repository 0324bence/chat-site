import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("/test")
    @ApiOperation({ summary: "Hello World", tags: ["testing"] })
    getHello(): string {
        return this.appService.getHello();
    }
}
