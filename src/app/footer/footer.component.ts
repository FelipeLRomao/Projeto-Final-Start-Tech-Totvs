import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  redesSociais: Array<any> = [
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
      icone: "https://i.ibb.co/N3DrdBr/instagram-image.png"
    },
    {
      app: "GitHub",
      link: "https://github.com/FelipeLRomao/Projeto-Final-Start-Tech-Totvs",
      icone: "https://i.ibb.co/jHBk9BY/github-logo.jpg"
    }
  ];

}
