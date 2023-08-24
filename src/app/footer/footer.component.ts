import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  redesSocias: Array<any> = [
    {
      app: "Facebook",
      link: "https://www.facebook.com/",
      icone: "https://i.ibb.co/SskNHd7/facebook-logo.png"
    },
    {
      app: "Twitter",
      link: "https://twitter.com/",
      icone: "https://i.ibb.co/QvybzcK/twitter-logo.png"
    },
    {
      app: "Instagram",
      link: "https://www.instagram.com/",
      icone: "https://i.ibb.co/55CXnKm/instagram.jpg"
    },
    {
      app: "GitHub",
      link: "https://github.com/FelipeLRomao/Projeto-Final-Start-Tech-Totvs",
      icone: "https://i.ibb.co/B38Y8Tw/github.jpg"
    }
  ];


}
