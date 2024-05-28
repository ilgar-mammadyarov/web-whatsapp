export interface ChatDto {
  id: string;
  name: string;
  photoUrl: string;
  date: Date;
  messages: MessageDto[];
}

export interface MessageDto {
  id: string;
  text?: string;
  date: Date;
  attachment?: string;
  isMine: boolean;
  owner: string;
  ownerPhotoUrl: string;
  isRead: boolean;
}
