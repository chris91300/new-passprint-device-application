import * as Device from 'expo-device';


export default function getDeviceName(){
    const deviceName = Device.deviceName || 'N/A';  // Ex: 'iPhone 15 Pro', 'Pixel 8'
    return deviceName;
}