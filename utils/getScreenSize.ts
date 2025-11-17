import { Dimensions } from 'react-native';


export default function getScreenSize(){
    const { width, height } = Dimensions.get('window');
    const screenSize = `${width}x${height}`;
    return screenSize;

}