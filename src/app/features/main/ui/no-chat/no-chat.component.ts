import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-chat',
  standalone: true,
  imports: [],
  templateUrl: './no-chat.component.html',
  styleUrl: './no-chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoChatComponent {}
