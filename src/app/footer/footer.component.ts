import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('footerAnimation', [
      state('show', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('show <=> hide', animate('300ms ease-in-out'))
    ])
  ]
})
export class FooterComponent {

}
