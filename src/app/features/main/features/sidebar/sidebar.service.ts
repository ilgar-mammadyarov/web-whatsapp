import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SidebarChat } from './sidebar.types';
import { MainStore } from '../../main.store';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private readonly mainStore = inject(MainStore);

  getChats(): Observable<SidebarChat[]> {
    return toObservable(this.mainStore.chats).pipe(
      map((chats) => {
        return chats.map((chat) => {
          const lastMessage = chat.messages.at(-1);
          const sidebarChat = {
            id: chat.id,
            chatName: chat.name,
            chatImageUrl: chat.photoUrl,
            lastMessage: lastMessage?.text || lastMessage?.attachment || '',
            lastMessageDate: lastMessage?.date.toISOString() || '',
            lastMessageOwner: lastMessage?.owner || '',
            selected: false,
          };
          return sidebarChat;
        });
      })
    );
  }
}
