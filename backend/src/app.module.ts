import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- Import this
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Initialize ConfigModule globally so .env is available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
