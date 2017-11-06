import { Component       } from '@angular/core';
import { TextWrapService } from './services/text-wrap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TextWrapService]
})
export class AppComponent {
  lines: string[];

  constructor(private textWrapService: TextWrapService) {};

  format = (text, length) => {
   this.lines =  this.textWrapService.textWrap(text, parseInt(length));
  };
}
