import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule, PassportModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiAuthenticationModule {}
