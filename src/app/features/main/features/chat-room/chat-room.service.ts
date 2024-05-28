import { Injectable, effect, inject } from '@angular/core';
import { MainStore } from '../../main.store';
import { Observable, map } from 'rxjs';
import { MessageDto } from '../../shared';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  private readonly mainStore = inject(MainStore);

  getChatInfo(): Observable<{
    chatId: string;
    chatName: string;
    chatImage: string;
  }> {
    return toObservable(this.mainStore.selectedChat).pipe(
      map((chat) => {
        const chatInfo = {
          chatId: chat?.id || '',
          chatName: chat?.name || '',
          chatImage: chat?.photoUrl || '',
        };
        return chatInfo;
      })
    );
  }

  getChatMessages(): Observable<MessageDto[]> {
    return toObservable(this.mainStore.selectedChatMessages);
  }
}
