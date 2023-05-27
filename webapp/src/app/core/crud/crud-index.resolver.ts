import { Resolve } from "@angular/router";
import { Observable } from "rxjs";

export abstract class CrudIndexResolver<TModel, TService extends { getAll(): Observable<TModel[]> }> implements Resolve<TModel[]> {
    protected constructor(protected readonly crudService: TService) {
    }

    resolve(): Observable<TModel[]> {
        return this.crudService.getAll();
    }

}
