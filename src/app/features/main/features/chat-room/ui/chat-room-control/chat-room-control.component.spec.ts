import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomControlComponent } from './chat-room-control.component';

describe('ChatRoomControlComponent', () => {
  let component: ChatRoomControlComponent;
  let fixture: ComponentFixture<ChatRoomControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRoomControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatRoomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
