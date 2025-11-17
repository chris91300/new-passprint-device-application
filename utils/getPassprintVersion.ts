import * as Application from 'expo-application';


export default function getPassprintVersion(){
    const passprintVersion = Application.nativeApplicationVersion || 'N/A';
    return passprintVersion;
}