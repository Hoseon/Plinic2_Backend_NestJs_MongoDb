import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SweettrackerService {
    constructor(private httpService: HttpService) { }
    
    findAll(): Observable<AxiosResponse> {
        return this.httpService.get('http://localhost:3000/cats');
    }

    findOne(uid: string, t_invoice: string): Observable<AxiosResponse>{
        var url = 'http://info.sweettracker.co.kr/api/v1/trackingInfo';
        var queryParams = '?' + encodeURIComponent('t_key') + '=3PP9Rnh8P0U3dJAhIxsPTg'; /* Service Key*/
        queryParams += '&' + encodeURIComponent('t_code') + '=' + encodeURIComponent('04'); /* 한 페이지 결과 수 */
        queryParams += '&' + encodeURIComponent('t_invoice') + '=' + encodeURIComponent(t_invoice); /* 한 페이지 결과 수 */
        return this.httpService.get(url + queryParams).pipe(
            map(response => {return response.data }),
        );
    }
}
    
