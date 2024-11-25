import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5656);
}

bootstrap().then((r) =>
  Logger.log(
    `the server will be started at http://localhost:${process.env.PORT ?? 5656}`,
    "Application",
  ),
);
