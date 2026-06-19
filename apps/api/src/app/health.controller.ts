import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@nestjs-template/types';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
