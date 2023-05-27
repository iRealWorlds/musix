import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, throwError } from "rxjs";

export abstract class CrudDetailsResolver<TModel, TService extends { getByKey(key: string|number): Observable<TModel> }> implements Resolve<TModel> {
    protected abstract readonly routeKey: string;

    protected constructor(protected readonly crudService: TService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<TModel> {
        const key = route.paramMap.get(this.routeKey);
        if (key) {
            return this.crudService.getByKey(key);
        } else {
            return throwError(() => new Error(`${this.routeKey} not found in route parameters.`));
        }
    }

}
