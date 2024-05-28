import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MessageDto } from '../../shared';
import { inject } from '@angular/core';
import { ChatRoomService } from './chat-room.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type ChatRoomState = {
  filter: string;
  chatId: string;
  chatName: string;
  chatImage: string;
  messages: MessageDto[];
};

const initialState: ChatRoomState = {
  filter: '',
  chatId: '',
  chatName: '',
  chatImage: '',
  messages: [],
};

export const ChatRoomStore = signalStore(
  withState(initialState),
  withHooks((store, chatRoomService = inject(ChatRoomService)) => ({
    onInit() {
      chatRoomService
        .getChatInfo()
        .pipe(takeUntilDestroyed())
        .subscribe(({ chatName, chatImage, chatId }) => {
          patchState(store, { chatName, chatImage, chatId });
        });

      chatRoomService
        .getChatMessages()
        .pipe(takeUntilDestroyed())
        .subscribe((messages) => {
          patchState(store, { messages });
        });
    },
  })),
  withMethods((state) => ({
    updateFilter(filter: string): void {
      patchState(state, { filter });
    },
  }))
);
