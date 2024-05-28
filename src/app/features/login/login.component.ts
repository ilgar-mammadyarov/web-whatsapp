import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginStore } from './login.store';
import { NgClass } from '@angular/common';
import { CountryCode } from '../../shared/models';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { MAIN_ROUTE } from '../../shared/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, HttpClientModule, RouterLink],
  providers: [LoginStore, LoginService],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly loginStore = inject(LoginStore);

  readonly countryCodes = this.loginStore.filteredCountryCodes;
  readonly selectedCountryCode = this.loginStore.selectedCountryCode;

  readonly mainRoute = MAIN_ROUTE;

  filterCountryCodes(searchQuery: string): void {
    this.loginStore.updateFilter(searchQuery);
  }

  selectCountryCode(countryCode: CountryCode): void {
    this.loginStore.updateSelectedCountryCode(countryCode);
  }

  alert(): void {
    alert('QR not supported yet!');
  }
}
