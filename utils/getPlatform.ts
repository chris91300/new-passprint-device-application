import * as Device from 'expo-device';



export default function getPlatform(){
    const platform = Device.osName || 'N/A'; // Ex: 'iOS', 'Android'
    return platform;
}