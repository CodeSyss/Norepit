import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
