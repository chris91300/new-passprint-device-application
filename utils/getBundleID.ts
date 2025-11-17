import * as Application from 'expo-application';

// Note: Pour bundleID, on utilise Application.applicationId ou getIosIdForVendorAsync / getAndroidId pour un identifiant unique du device
export default async function getBundleID(platform: string){
    const bundleID = (platform === "iOS" ? await Application.getIosIdForVendorAsync() : Application.getAndroidId()) || 'N/A';
    return bundleID;
}