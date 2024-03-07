import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
  
    const config = new DocumentBuilder().setTitle("Chat Site API").setDescription("Chat Site API").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
bootstrap();
