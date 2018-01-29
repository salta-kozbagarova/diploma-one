import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';
import { AdBanner } from '../_models';

@Injectable()
export class AdBannerService {

  private adBannerUrl = 'http://127.0.0.1:8000/ad-banners';//'/api/ad-banners';

  constructor(private http: HttpClient) { }

  getAdBanners(): Observable<AdBanner[]> {
    return this.http.get<AdBanner[]>(this.adBannerUrl+'/ad-banners');
  }
}
