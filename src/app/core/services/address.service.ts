import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  private readonly httpClient = inject(HttpClient);

  // this is the object will be sent to the server : 
  //   {
  //     "name": "Home",
  //     "details": "Home details",
  //     "phone": "01010700700",
  //     "city": "Gizaa"
  //  }

  // this is the response of the api 
  //   {
  //     "status": "success",
  //     "message": "Address added successfully",
  //     "data": [
  //         {
  //             "_id": "6a1edf0bfc33d8001213e688",
  //             "name": "Home",
  //             "details": "Home details",
  //             "phone": "01010700700",
  //             "city": "Gizaa"
  //         }
  //     ]
  //  }
  addAddress(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/addresses`,data)
  }


  // Response Object : 
  // {
  //   "status": "success",
  //   "message": "Address removed successfully",
  //   "data": []
  // }
  removeAddress(addressId:string):Observable<any>
  {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/addresses/${addressId}`)
  }


  // Response Object : 
  // {
  //   "status": "success",
  //   "data": {
  //       "_id": "6a1edff6fc33d8001213e6c8",
  //       "name": "Home",
  //       "details": "Home details",
  //       "phone": "01010700700",
  //       "city": "Gizaa"
  //   }
  // }
  getSpecificAddress(addressId:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses/${addressId}`)
  }


  // Response Object 
  // {
  //   "results": 2,
  //   "status": "success",
  //   "data": [
  //       {
  //           "_id": "6a1edff6fc33d8001213e6c8",
  //           "name": "Home",
  //           "details": "Home details",
  //           "phone": "01010700700",
  //           "city": "Gizaa"
  //       },
  //       {
  //           "_id": "6a1ee032fc33d8001213e6d0",
  //           "name": "Home",
  //           "details": "Home details",
  //           "phone": "01010700700",
  //           "city": "Gizaa"
  //       }
  //   ]
  // }
  getLoggedUserAddresses():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/addresses`)
  }
}
