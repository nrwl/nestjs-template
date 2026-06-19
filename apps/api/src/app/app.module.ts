import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [],
  controllers: [AppController, HealthController, TodosController],
  providers: [AppService, TodosService],
})
export class AppModule {}
