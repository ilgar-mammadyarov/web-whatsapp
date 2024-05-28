import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatRoomComponent, SidebarComponent } from './features';
import { MainStore } from './main.store';
import { NoChatComponent } from './ui';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, ChatRoomComponent, NoChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly mainStore = inject(MainStore);

  readonly selectedChat = this.mainStore.selectedChat;
}
