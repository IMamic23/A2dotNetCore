import { Contact, KeyValuePair } from './vehicle';

export interface KeyValuePair { 
  id: number; 
  name: string; 
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
}

export interface Vehicle {
  id: number; 
  model: KeyValuePair;
  make: KeyValuePair;
  isRegistered: boolean;
  features: KeyValuePair[];
  contact: Contact;
  additionalInfo: AdditionalInfo;
  lastUpdate: string; 
}

export interface SaveVehicle {
  id: number; 
  modelId: number;
  makeId: number;
  isRegistered: boolean;
  features: number[];
  additionalInfo: AdditionalInfo;
  contact: Contact;
}

export interface Make {
  id: number,
  name: string,
  models: KeyValuePair[]
}

export interface AdditionalInfo {
  modelType: string,
  yearOfManafacture: number,
  firstRegistrationYear: number,
  mileage: number,
  modelEngineType: string,
  modelEnginePower: number,
  gearType: string,
  noOfGears: number,
  fuelConsumption: number,
  carState: string,
  ownerNo: number,
  carCurrentLocation: string,
  carDescription: string,
  carColor: string
}

export interface SaveMake {
  id: number; 
  name: string;
  models: KeyValuePair[]
}

export interface Makes {
  id: number; 
  name: string;
  models: KeyValuePair[];
  new: boolean;
}

export interface SaveModel {
   id: number; 
   makeId: number;
   name: string; 
}

export interface SaveFeature {
  id: number;
  name: string;
}