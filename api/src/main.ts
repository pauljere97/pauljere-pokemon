import { NestFactory } from '@nestjs/core';
import { PokedexApiModule } from './pokedex-api.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix('api');
  app.enableCors({ // enable CORS
    origin: 'http://localhost:4200', // client side URL
    methods: 'GET',
    credentials: true,
  });

  await app.listen(3000);

  if (module.hot) { // hot reload config
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
