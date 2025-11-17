import * as Device from 'expo-device';


export default function getSystemVersion(){
    const systemVersion = Device.osVersion || 'N/A'; // Ex: '17.0', '14'
    return systemVersion;

}