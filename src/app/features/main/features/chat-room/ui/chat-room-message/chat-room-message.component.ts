import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MessageDto } from '@main/shared';
@Component({
  selector: 'app-chat-room-message',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './chat-room-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomMessageComponent {
  message = input<MessageDto | null>(null);
}
