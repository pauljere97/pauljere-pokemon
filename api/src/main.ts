import { NestFactory } from '@nestjs/core';
import { PokedexApiModule } from './pokedex-api.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200', // Your Angular app URL
    methods: 'GET',
    credentials: true,
  });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
