import { Injectable } from '@angular/core';
import { Observable, delay, of, pipe } from 'rxjs';
import { ChatDto, CurrentUser } from './shared';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  getUserInfo(): Observable<CurrentUser> {
    return of({
      name: 'Ilgar',
      phoneNumber: '+994 10 100 00 11',
      imageUrl: './assets/kitty.jpg',
    }).pipe(delay(1000));
  }

  getChats(): Observable<ChatDto[]> {
    return of([
      {
        id: crypto.randomUUID(),
        name: 'Jack',
        date: new Date(),
        photoUrl:
          'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/01/Anakin-Skywalker-Star-Wars-Revenge-of-the-Sith.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5',
        messages: [
          {
            id: crypto.randomUUID(),
            text: 'Hello',
            date: new Date(),
            isMine: true,
            owner: 'Ilgar',
            ownerPhotoUrl:
              'https://media-sof1-1.cdn.whatsapp.net/v/t61.24694-24/185189871_5924175547652916_4680604257171573419_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIEPRFOuo4NgyxZrkyHhF9s89rrl7pTP5Ub_o5dFKXjz8&oe=664C34D1&_nc_sid=e6ed6c&_nc_cat=104',
            isRead: true,
          },
          {
            id: crypto.randomUUID(),
            text: 'What are you doing?',
            date: new Date(),
            isMine: true,
            owner: 'Ilgar',
            ownerPhotoUrl:
              'https://media-sof1-1.cdn.whatsapp.net/v/t61.24694-24/185189871_5924175547652916_4680604257171573419_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIEPRFOuo4NgyxZrkyHhF9s89rrl7pTP5Ub_o5dFKXjz8&oe=664C34D1&_nc_sid=e6ed6c&_nc_cat=104',
            isRead: true,
          },
          {
            id: crypto.randomUUID(),
            text: 'Do you want to play a game? PLAYYYYYYYYYY PLAAYYYYYYYYYYY YEYYYYYY',
            date: new Date(),
            isMine: true,
            owner: 'Ilgar',
            ownerPhotoUrl:
              'https://media-sof1-1.cdn.whatsapp.net/v/t61.24694-24/185189871_5924175547652916_4680604257171573419_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIEPRFOuo4NgyxZrkyHhF9s89rrl7pTP5Ub_o5dFKXjz8&oe=664C34D1&_nc_sid=e6ed6c&_nc_cat=104',
            isRead: true,
          },
          {
            id: crypto.randomUUID(),
            text: 'Fine for me',
            date: new Date(),
            isMine: false,
            owner: 'Jack',
            isRead: true,
            ownerPhotoUrl:
              'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/01/Anakin-Skywalker-Star-Wars-Revenge-of-the-Sith.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5',
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: 'Jhon',
        date: new Date(),
        photoUrl:
          'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/streams/2013/April/130425/6C7091293-g-ent-111129-darth-vader-730a.jpg',
        messages: [
          {
            id: crypto.randomUUID(),
            text: 'Heyy!!!!',
            date: new Date(),
            isMine: false,
            owner: 'Jhon',
            isRead: true,
            attachment:
              'https://i.ebayimg.com/images/g/JMEAAOSwZbBiP6MR/s-l1200.jpg',
            ownerPhotoUrl:
              'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/streams/2013/April/130425/6C7091293-g-ent-111129-darth-vader-730a.jpg',
          },
          {
            id: crypto.randomUUID(),
            text: 'Yep?',
            date: new Date(),
            isMine: true,
            owner: 'Ilgar',
            isRead: false,
            ownerPhotoUrl:
              'https://media-sof1-1.cdn.whatsapp.net/v/t61.24694-24/185189871_5924175547652916_4680604257171573419_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_Q5AaIEPRFOuo4NgyxZrkyHhF9s89rrl7pTP5Ub_o5dFKXjz8&oe=664C34D1&_nc_sid=e6ed6c&_nc_cat=104',
          },
        ],
      },
    ]);
    // .pipe(delay(2000));
  }
}
