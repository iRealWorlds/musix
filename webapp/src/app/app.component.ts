import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { Identity } from "src/app/core/auth/identity.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser$?: Observable<Identity | null | undefined>;

  private readonly _unsubscribeAll = new Subject<void>();

  /**
   * AppComponent constructor method.
   *
   * @param _authService
   */
  constructor(
      private readonly _authService: AuthService,
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // When the auth token changes, the identity service should fetch the new identity
    this._authService.tokenChanged.asObservable().pipe(
        takeUntil(this._unsubscribeAll),
        switchMap(() => this._authService.getIdentity()),
    ).subscribe();

    this.currentUser$ = this._authService.currentIdentity$.pipe(
        takeUntil(this._unsubscribeAll)
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
