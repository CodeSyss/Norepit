// src/firebase/firebase.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit{
  private readonly logger = new Logger(FirebaseService.name);
  private _adminApp: admin.app.App;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.logger.log('Inicializando Firebase Admin SDK usando variables de entorno...');

    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');

    // Opcional: Obtén otras configuraciones si las necesitas
    // const databaseURL = this.configService.get<string>('FIREBASE_DATABASE_URL');
    // const storageBucket = this.configService.get<string>('FIREBASE_STORAGE_BUCKET');


    if (!projectId || !privateKey || !clientEmail) {
      this.logger.error('Faltan variables de entorno de Firebase (FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL).');
      throw new Error('Faltan credenciales de Firebase en las variables de entorno.');
    }

    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    try {
        const serviceAccount: admin.ServiceAccount = {
            projectId: projectId,
            privateKey: formattedPrivateKey, 
            clientEmail: clientEmail,
        };

        this._adminApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // Opcional: Descomenta si definiste estas variables en .env
            // databaseURL: databaseURL,
            // storageBucket: storageBucket,
        });
        this.logger.log('Firebase Admin SDK inicializado correctamente.');

    } catch (error) {
      this.logger.error('Error al inicializar Firebase Admin SDK:', error.stack);
      throw error;
    }
  }

  // Getters para acceder a los servicios 
  get auth(): admin.auth.Auth {
    if (!this._adminApp) throw new Error('Firebase Admin no inicializado');
    return this._adminApp.auth();
  }

  get firestore(): admin.firestore.Firestore {
    if (!this._adminApp) throw new Error('Firebase Admin no inicializado');
    return this._adminApp.firestore();
  }

  get storage(): admin.storage.Storage {
    if (!this._adminApp) throw new Error('Firebase Admin no inicializado');
    return this._adminApp.storage();
  }

}