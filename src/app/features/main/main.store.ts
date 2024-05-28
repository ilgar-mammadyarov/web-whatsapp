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
import { MainService } from './main.service';
import { forkJoin } from 'rxjs';
import { ChatDto, MessageDto } from './shared';
import { setError, setFulfilled, setPending, withRequestStatus } from '@shared';

type MainState = {
  currentUserName: string;
  currentUserNumber: string;
  currenUserImage: string;
  chats: ChatDto[];
  selectedChatId: string;
};

const initialState: MainState = {
  currentUserName: '',
  currentUserNumber: '',
  currenUserImage: '',
  chats: [],
  selectedChatId: '',
};

export const MainStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withComputed((store) => ({
    selectedChat: computed(() => {
      const chat =
        store.chats().find((c) => c.id === store.selectedChatId()) || null;
      return chat;
    }),
    selectedChatMessages: computed(() => {
      const chat =
        store.chats().find((c) => c.id === store.selectedChatId())?.messages ||
        [];
      return chat;
    }),
  })),
  withMethods((store) => ({
    updateSelectedChat(chatId: string) {
      patchState(store, { selectedChatId: chatId });
    },
    sendMessage(chatId: string, message: MessageDto): void {
      const chat = store.chats().find((c) => c.id === chatId);
      if (chat) {
        chat.messages = [...chat.messages, message];
        const chats = store.chats().filter((c) => c !== chat);
        chats.push(chat);
        patchState(store, { chats });
      }
    },
  })),
  withHooks({
    onInit(store, mainService = inject(MainService)) {
      patchState(store, setPending());

      forkJoin([mainService.getUserInfo(), mainService.getChats()])
        .pipe(takeUntilDestroyed())
        .subscribe({
          next: ([{ name, phoneNumber, imageUrl }, chats]) => {
            patchState(
              store,
              {
                currentUserName: name,
                currentUserNumber: phoneNumber,
                currenUserImage: imageUrl,
                chats,
              },
              setFulfilled()
            );
          },
          error: (error) => setError(error),
        });
    },
  })
);
