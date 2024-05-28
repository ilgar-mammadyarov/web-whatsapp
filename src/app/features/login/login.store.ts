import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { COUNTRY_CODES, CountryCode } from '@shared';
import { LoginService } from './login.service';

type LoginState = {
  countryCodes: CountryCode[];
  isLoading: boolean;
  filter: string;
  selectedCountryCode: CountryCode | null;
};

const initialState: LoginState = {
  countryCodes: COUNTRY_CODES,
  isLoading: false,
  filter: '',
  selectedCountryCode: null,
};

export const LoginStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    filteredCountryCodes: computed(() =>
      state.filter()
        ? state
            .countryCodes()
            .filter((code) =>
              code.name
                .toLocaleLowerCase()
                .includes(state.filter().toLocaleLowerCase())
            )
        : COUNTRY_CODES
    ),
  })),
  withHooks({
    onInit(state, loginService = inject(LoginService)) {
      loginService
        .getUserCountry()
        .pipe(takeUntilDestroyed())
        .subscribe((code) => {
          const currentCountryCode: CountryCode | null =
            state.countryCodes().find((c) => c.code === code) ?? null;
          console.log({ currentCountryCode, code });
          patchState(state, { selectedCountryCode: currentCountryCode });
        });
    },
  }),
  withMethods((state) => ({
    updateFilter(filter: string): void {
      patchState(state, { filter });
    },
    updateSelectedCountryCode(countryCode: CountryCode): void {
      patchState(state, { selectedCountryCode: countryCode });
    },
  }))
);
