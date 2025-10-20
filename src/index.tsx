import RnSmsFetch, { type Sms } from './NativeRnSmsFetch';

export async function readSms(filter: object = {}): Promise<Sms[]> {
  if (!RnSmsFetch)
    throw new Error(
      'Native module RnSmsFetch not found. Did you enable New Arch?'
    );

  const filterJson = JSON.stringify(filter);

  return RnSmsFetch.readSms(filterJson);
}

export type { Sms };
