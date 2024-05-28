import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SidebarChat } from './sidebar.types';
import { computed, inject } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type SidebarState = {
  filter: string;
  chats: SidebarChat[];
};

const initialState: SidebarState = {
  filter: '',
  chats: [],
};

export const SidebarStore = signalStore(
  withState(initialState),
  withHooks({
    onInit(state, sidebarService = inject(SidebarService)) {
      sidebarService
        .getChats()
        .pipe(takeUntilDestroyed())
        .subscribe((chats) => {
          patchState(state, { chats });
        });
    },
  }),
  withMethods((state) => ({
    updateFilter(filter: string): void {
      patchState(state, { filter });
    },
    updateSelectedChat(selectedChat: SidebarChat): void {
      const updatedList = state.chats().map((chat) => {
        chat === selectedChat
          ? (chat.selected = true)
          : (chat.selected = false);
        return chat;
      });
      patchState(state, {
        chats: updatedList,
      });
    },
  })),
  withComputed((state) => ({
    filteredChats: computed(() =>
      state.filter()
        ? state
            .chats()
            .filter((chat) =>
              chat.chatName
                .toLocaleLowerCase()
                .includes(state.filter().toLocaleLowerCase())
            )
        : state.chats()
    ),
  }))
);
