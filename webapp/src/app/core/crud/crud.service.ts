import { ApiService } from "src/app/core/api/api.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { HttpClient } from "@angular/common/http";

export abstract class CrudService<TModel extends { key: string|number}, TModelCreateRequest, TModelUpdateRequest> extends ApiService {
    protected abstract endpoint: string;

    private readonly _all = new BehaviorSubject<TModel[]|undefined>(undefined)
    private readonly _details = new BehaviorSubject<TModel|undefined>(undefined)

    /**
     * SignUpService constructor method.
     *
     * @param environment
     * @param _http
     */
    protected constructor(
        protected override readonly environment: EnvironmentConfig,
        private readonly _http: HttpClient,
    ) {
        super(environment);
    }

    get all$(): Observable<TModel[] | undefined> {
        return this._all.asObservable();
    }

    get details$(): Observable<TModel | undefined> {
        return this._details.asObservable();
    }

    getAll(): Observable<TModel[]> {
        const uri = this.buildApiEndpointUri(this.endpoint);
        return this._http.get<TModel[]>(uri).pipe(
            tap(entities => this._all.next(entities))
        );
    }

    create(data: TModelCreateRequest): Observable<TModel> {
        const uri = this.buildApiEndpointUri(this.endpoint);
        return this._http.post<TModel>(uri, data).pipe(
            tap(entity => {
                const loaded = this._all.value;
                if (loaded) {
                    this._all.next([
                      entity,
                        ...loaded
                    ])
                }
            })
        );
    }

    getByKey(key: string|number): Observable<TModel> {
        const uri = this.buildApiEndpointUri([this.endpoint, key.toString()]);
        return this._http.get<TModel>(uri).pipe(
            tap(entity => this._details.next(entity))
        );
    }

    updateByKey(key: string|number, data: TModelUpdateRequest): Observable<TModel> {
        const uri = this.buildApiEndpointUri([this.endpoint, key.toString()]);
        return this._http.patch<TModel>(uri, data).pipe(
            tap(entity => {
                const loaded = this._all.value;
                if (loaded) {
                    const index = loaded.findIndex(a => a.key === key);
                    if (index !== -1) {
                        loaded[index] = entity;
                        this._all.next(loaded);
                    }
                }
            }),
            tap(entity => {
                if (this._details.value?.key === key) {
                    this._details.next(entity);
                }
            })
        );
    }

    deleteByKey(key: string|number): Observable<void> {
        const uri = this.buildApiEndpointUri([this.endpoint, key.toString()]);
        return this._http.delete<void>(uri).pipe(
            tap(() => {
                const loaded = this._all.value;
                if (loaded) {
                    const index = loaded.findIndex(a => a.key === key);
                    if (index !== -1) {
                        loaded.splice(index, 1);
                        this._all.next(loaded);
                    }
                }
            }),
            tap(() => {
                if (this._details.value?.key === key) {
                    this._details.next(undefined);
                }
            })
        );
    }
}
