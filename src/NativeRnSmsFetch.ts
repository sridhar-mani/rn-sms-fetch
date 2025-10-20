import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Sms {
  _id: string;
  address: string;
  body: string;
  date: number;
}

export interface Spec extends TurboModule {
  readSms(filterJson?: string): Promise<Sms[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RnSmsFetch'
) as Spec | null;
