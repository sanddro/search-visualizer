import { toPromise } from './Store';
import { speed } from '../store/stores';

export async function sleep(ms) {
  if (ms === undefined)
    ms = await toPromise(speed);
  return await new Promise(resolve => setTimeout(resolve, ms));
}