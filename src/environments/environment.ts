// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {defaultEnvironment} from "./environment.default";

export const environment = {
  firebase: {
    apiKey: "AIzaSyDJ_eDBrLJttuFSdLMWPX-adwKUX6-JAHQ",
    authDomain: "quitorecicla-firebase-auth.firebaseapp.com",
    projectId: "quitorecicla-firebase-auth",
    storageBucket: "quitorecicla-firebase-auth.appspot.com",
    messagingSenderId: "538033766324",
    appId: "1:538033766324:web:f6c00149b7aa881acafce1"
  },
    production: false,
    // HOST: 'https://will.epn.edu.ec:8443',
    SIZEFILE: 1000000,
    ACCEPTFILES: '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpeg',
    ARCHIVO_CONDICIONES_REGISTRO: 'https://www.secst.cl/upfiles/documentos/04042016_845pm_570326d2114b3.pdf',
    publicpem:'-----BEGIN PUBLIC KEY-----\n' +
        'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHhfjo9vdhq5RcJBbtWZV2W9yJ4g\n' +
        'U9iz59fZCwitU6BIBNqi213k38GnsiPtglA8eB3xUNVtGo/33GZCWYfSI/W762Sr\n' +
        'bYkH4PA5ILzO5eN+3/7jHPteKOpGhI3kK0YODVgU1xXPYcZvNpLpTymJ3Qfhz5JF\n' +
        'X2idAelTfYL9z6J1AgMBAAE=\n' +
        '-----END PUBLIC KEY-----',
    privatepem: '-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIICXAIBAAKBgQCIoLwCAvxWLY8LDtM4a3at2xsKym3mHxCsj+hbZaRbIwjDQnMk\n' +
        '/U2rhanO4zswXLOq/X/WFdB/P6QyyYfPpgLryT+TYYJk/aK0rwv2tIIXHkdYCCn1\n' +
        '4YL88pdRcQPy/67ctu1NsSMIY0P7KLISraOAO08y74bcks6PSavT5ijIuwIDAQAB\n' +
        'AoGAGbPrSpGXOPsfItxqHf4ReIl0n+YPILCNaXk1JCSN89s2Zc1Vbgr9Fpxxoosa\n' +
        '8nEuF6fS6cp2y8mEMU26b/TyLXTxopyYAi+Tmg+joAcEg7OXxxdHsslpfd7S12up\n' +
        'P1ZI9KbBockm+fZAD7jaBiQi8xq7hAmSWPNVCY2UY+/mfykCQQC98hyrzPyHWgzV\n' +
        'vSM4c8qQv/XVDCaFP15+IVbA10IAYJY6Oi72lt7MxrGGlTrVfuUCrnRYw/4EwiHs\n' +
        'MGFdgfudAkEAuCQB0v5rRhhIbtttKrDofRgy2z9SYRisTEnUbiwsHffbTx3gpg7u\n' +
        'nPzyErNcpdm/Nj94PQ1xZ6fzzLIWcG6CNwJAdT6uLemw8sdF5uUBiYYHwkOLNb9z\n' +
        'Q4pzBD4F87CrP9pewIBLntBPpGz9BYq1rzTNnVMb4/LOqBdAoy7V2scyDQJBAImB\n' +
        'Qed4W0z1lylJLAUEJCg96MQ2TeL51LgHLd2zmKIsUxWKfxYh8mdCr9XtIFMs/g+Z\n' +
        'Z8VXg4bfMTx7BCyjKRMCQF8sjPUBOjShpLyRD9+egqAdBOr1Qgd9xiCfCAm1ATyJ\n' +
        'sfXDJrPdlA1bjeZUMEEz24JRiHrgotP8gU3utCH04Qo=\n' +
        '-----END RSA PRIVATE KEY-----'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
