import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public launches: any[];
  public statuses: any[];

  constructor(private http: HttpClient) { }

  public getStatusTypes = (): Observable<any[]> =>
  this.http.get(environment.url + '/assets/data/launchstatus.json').pipe(
    map((res: any) => res.types),
    tap((res: any[]) => (this.statuses = res))
  )

  public getAgencies = (): Observable<any[]> =>
  this.http
    .get(environment.url + '/assets/data/agencies.json')
    .pipe(map((res: any) => res.agencies))

  public getMissionTypes = (): Observable<any[]> =>
  this.http
    .get(environment.url + '/assets/data/missiontypes.json')
    .pipe(map((res: any) => res.types))

  public getLaunches = (): Observable<any[]> =>
  this.http
    .get(environment.url + '/assets/data/launches.json')
    .pipe(map((res: any) => res.launches))

}
