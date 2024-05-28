import { Signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { Observable, filter } from 'rxjs';

export type RequestStatus =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      isSettled: computed(() => {
        const status = requestStatus();
        return (
          status === 'fulfilled' ||
          (typeof status === 'object' && 'error' in status)
        );
      }),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    }))
  );
}

export function setPending(): RequestStatusState {
  return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}

export const isRequestSettled = <
  TRequest extends { isSettled: Signal<boolean> }
>(
  request: TRequest
): Observable<boolean> => {
  return toObservable(request.isSettled).pipe(
    filter((isSettled) => isSettled === true)
  );
};
