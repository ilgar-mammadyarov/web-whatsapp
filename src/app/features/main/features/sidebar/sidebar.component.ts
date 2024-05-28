import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarStore } from './sidebar.store';
import { MainStore } from '../../main.store';
import { NgClass } from '@angular/common';
import { SidebarChat } from './sidebar.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  providers: [SidebarStore],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly sidebarStore = inject(SidebarStore);
  private readonly mainStore = inject(MainStore);

  readonly filter = this.sidebarStore.filter;
  readonly chats = this.sidebarStore.filteredChats;
  readonly currentUserImageUrl = this.mainStore.currenUserImage;

  filterChats(chatName: string): void {
    this.sidebarStore.updateFilter(chatName);
  }

  clearFilter(): void {
    this.sidebarStore.updateFilter('');
  }

  selectChat(chat: SidebarChat): void {
    this.sidebarStore.updateSelectedChat(chat);
    this.mainStore.updateSelectedChat(chat.id);
  }
}
