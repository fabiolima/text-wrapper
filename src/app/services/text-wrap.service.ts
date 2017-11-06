import { TextWrapInterface } from './text-wrap.interface';
import { Injectable        } from '@angular/core';

@Injectable()
export class TextWrapService implements TextWrapInterface {

  textWrap = (text: string, length): string[] => {
    
    const words = this.getWords(text);
    
    let lines          = [];
    let remainingSpace = length;
  
    words.forEach(word => {
      if (word.length + 1 > remainingSpace) { 
        
        let segmentsRegex = ".{1," + length + "}", segment;
        let regex         = new RegExp(segmentsRegex, "g");

        while(segment = regex.exec(word)) {
          lines.push(segment[0]);
        }
      }

      else {
        lines[lines.length - 1] 
          ? lines[lines.length - 1] += ' ' + word
          : lines.push(word);
      }

      remainingSpace = length - lines[lines.length - 1].length;
    })

    return lines;
  }

  getWords = (text: string): string[] => {
    return this.removeMultipleSpaces(text).split(' ');
  }

  removeMultipleSpaces = (text: string): string => {
    return text.trim().replace(/\s\s+/g, ' ');
  }
}
