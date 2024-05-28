import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContenteditableValueAccessor, Message } from '@shared';

@Component({
  selector: 'app-chat-room-control',
  standalone: true,
  imports: [ReactiveFormsModule, ContenteditableValueAccessor, NgClass],
  templateUrl: './chat-room-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomControlComponent {
  private readonly cd = inject(ChangeDetectorRef);

  chatData = output<Message>();

  form = new FormGroup({
    message: new FormControl(''),
    image: new FormControl<string | null | ArrayBuffer>(null),
  });

  transformInput(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }

  sendMessage(): void {
    const message = this.transformInput(this.form.value.message ?? '');
    const image = this.form.value.image || null;
    if (message || image) {
      this.chatData.emit({ image, message });
      this.form.reset();
    }
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    let reader = new FileReader();

    if (fileInput && fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          image: reader.result,
        });
        this.sendMessage();
        this.cd.markForCheck();
      };
    }
  }
}
