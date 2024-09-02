import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerOptions() {
  return new DocumentBuilder()
    .setTitle('Basic Ecommerce documentation')
    .setDescription('Basic Ecommerce documentation')
    .setVersion('1.0')
    .build();
}
