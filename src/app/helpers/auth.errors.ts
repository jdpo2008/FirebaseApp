import { FirebaseError } from "firebase";

export function getErrorAuthMessage(error: FirebaseError): string {
  let messages;
  switch (error.code) {
    case "auth/wrong-password": {
      messages = "Email y/o Password Incorrectos Verifique";
      break;
    }

    case "auth/user-not-found": {
      messages = "Email y/o Password Incorrectos Verifique";
      break;
    }

    case "auth/too-many-requests": {
      messages = "Muchos intentos fallidos. Espere unos minutos";
      break;
    }

    case "auth/email-already-in-use": {
      messages = "El Email ya se encuentra registrado. Inicia Sesión";
      break;
    }

    default: {
      messages = "";
    }
  }
  return messages;
}
