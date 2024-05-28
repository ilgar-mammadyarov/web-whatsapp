import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ChatRoomStore } from './chat-room.store';
import { NgClass } from '@angular/common';
import { ChatRoomControlComponent, ChatRoomMessageComponent } from './ui';
import { Message } from '@shared';
import { MessageDto } from '@main/shared';
import { MainStore } from '../../main.store';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [NgClass, ChatRoomMessageComponent, ChatRoomControlComponent],
  providers: [ChatRoomStore],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent {
  private readonly chatRoomStore = inject(ChatRoomStore);
  private readonly mainStore = inject(MainStore);

  readonly chatId = this.chatRoomStore.chatId;
  readonly chatName = this.chatRoomStore.chatName;
  readonly chatImage = this.chatRoomStore.chatImage;
  readonly messages = this.chatRoomStore.messages;

  readonly currentUser = this.mainStore.currentUserName;
  readonly currentUserImage = this.mainStore.currenUserImage;

  constructor() {
    // Scroll down when new message comes
    effect(() => {
      this.messages();
      const el = document.getElementById('scrollElement');
      if (el) {
        el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
      }
    });
  }

  sendMessage(message: Message): void {
    const transformedMessage: MessageDto = {
      id: crypto.randomUUID(),
      text: message.message,
      date: new Date(),
      attachment: message.image?.toString() || undefined,
      isMine: true,
      owner: this.currentUser(),
      ownerPhotoUrl: this.currentUserImage(),
      isRead: false,
    };
    this.mainStore.sendMessage(this.chatId(), transformedMessage);
  }
}
