import * as Keychain from 'react-native-keychain';

async function checkBiometryAvailability(): Promise<boolean> {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();

    if (biometryType !== null && biometryType !== undefined) {
      console.log(`Biométrie disponible : ${biometryType}`);
      // La biométrie est supportée et potentiellement configurée
      return true;
    } else {
      console.log("Aucun type de biométrie n'est disponible ou supporté.");
      // La biométrie n'est pas disponible ou l'appareil ne la supporte pas
      return false;
    }
  } catch (error) {
    // Gérer les erreurs de permission ou autres
    console.error("Erreur lors de la vérification de la biométrie:", error);
    return false;
  }
}

export default checkBiometryAvailability;