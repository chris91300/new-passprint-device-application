import { userInformationsSchema } from '@/preparation/sdk/backend/types/schemaForAll';
import { DeviceStoreType, WebSiteStoreType } from '@/preparation/sdk/backend/types/schemaForDevice';
import z from 'zod';
import { create } from 'zustand';

const userDataSchema = userInformationsSchema.extend({pseudo: z.string()}).partial();
type Informations = z.infer<typeof userDataSchema>;

export type User = {
    pseudo: string | undefined;
    informations: Informations;
    webSites: WebSiteStoreType[],
    device: DeviceStoreType,
    biometryIsAvailable: boolean,
    typeOfAuthentification?: 'biometrie' | 'password',
    setPseudo: (pseudo: string) => void,
    setInformations: (informations: Informations) => void,
    setDevice: (deviceData: DeviceStoreType) => void,
    setWebsites: (websitesData: WebSiteStoreType[]) => void,
    setBiometryIsAvailable: (biometryIsAvailable: boolean) => void,
    setTypeOfAuthentification: (typeOfAuthentification: 'biometrie' | 'password') => void,
}



const useUserStore = create<User>((set) => ({
    pseudo: undefined,
    informations: {},
    webSites: [],
    device: {} as DeviceStoreType,
    biometryIsAvailable: false,
    typeOfAuthentification: 'password',

    setPseudo: (newPseudo: string) => set({pseudo: newPseudo}),

    setInformations: (newInformations: Informations) => set(({informations}: User) => {
        const informationsUpdated = {
            ...informations,
            ...newInformations
        }
        return {informations: informationsUpdated}
    }),
    setDevice: (deviceData: DeviceStoreType) => set(() => ({device: {...deviceData}})),
    setWebsites: (websitesData: WebSiteStoreType[]) => set(() => ({webSites: websitesData})),
    setBiometryIsAvailable: (biometryIsAvailable: boolean) => set(() => ({biometryIsAvailable})),
    setTypeOfAuthentification: (typeOfAuthentification: 'biometrie' | 'password') => set(() => ({typeOfAuthentification})),
}))


export const useUser = () => useUserStore((state) => state)
