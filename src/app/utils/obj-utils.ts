import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjUtils {
  public  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((val, key) => val?.[key], obj);
  }
}
