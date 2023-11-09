import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    // private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
    //admin
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6ZmFsc2V9.oEyti9UbZt78ejCXw9Ocv20zoqXp6ZWNMXDI_b6oICk';
    //not admin
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(delay(1000), mergeMap(() => {
            // Fake implementation of /api/authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                //  const body = JSON.parse(request.body); //the old code which introduce bug
                const body = request.body;
                if (body.email === 'mosh@domain.com' && body.password === '1234') {
                    return of(new HttpResponse({ status: 200, body: { token: this.token } }));
                } else {
                    return of(new HttpResponse({ status: 200 }));
                }
            }

            // Fake implementation of /api/orders
            if (request.url.endsWith('/api/orders') && request.method === 'GET') {
                if (request.headers.get('Authorization') === `Bearer ${this.token}`) {
                    return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
                } else {
                    return of(new HttpResponse({ status: 401 }));
                }
            }
            // pass through any requests not handled above
            return next.handle(request);
        }));
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
