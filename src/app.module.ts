import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UrlModel } from './url/url.module';
import { JwtModule } from 'src/jwt.module';
import { UrlService } from './url/url.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UrlModel,
    PrismaModule,
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, UrlService, PrismaService, UserService],
})
export class AppModule { }
