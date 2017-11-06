import { TestBed, inject } from '@angular/core/testing';

import { TextWrapService } from './text-wrap.service';

describe('TextWrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextWrapService]
    });
  });

  it('should be created', inject([TextWrapService], (service: TextWrapService) => {
    expect(service).toBeTruthy();
  }));

  it('should remove multiple spaces from string', inject([TextWrapService], (service: TextWrapService) => {
    let dirtyString = " x   x ";

    expect(service.removeMultipleSpaces(dirtyString)).toEqual("x x");
  }));

  it('given a string should return an array with his words', inject([TextWrapService], (service: TextWrapService) => {
    let string = "simple text example";
    let words  = service.getWords(string);

    expect(words[0]).toEqual("simple");
    expect(words[1]).toEqual("text");
    expect(words[2]).toEqual("example");
    expect(words.length).toEqual(3);
  }));

  it('after wrapped, every line should be minor then character per line limit', inject([TextWrapService], (service: TextWrapService) => {
    
    let text = `Lorem ipsum dolor sit amet, consectetur elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.`;

    let limit = 20;
    let lines = service.textWrap(text, limit);

    lines.forEach(line => {
      expect(line.length).toBeLessThanOrEqual(limit);
    })
  }));

  it('should put a word to a new line when his not fit on current line and his size is less then character per line limit', inject([TextWrapService], (service: TextWrapService) => {
    let text  = "pink elephant";
    let limit = 10;
    
    let lines = service.textWrap(text, limit);

    expect(lines.length).toEqual(2);
    expect(lines[0]).toEqual("pink");
    expect(lines[1]).toEqual("elephant");
  }));

  it('should cut a word to a new line when his length exceed the character per line limit', inject([TextWrapService], (service: TextWrapService) => {
    let text = "elephant";
    let limit = 4;

    let lines = service.textWrap(text, limit);

    // 2 lines
    expect(lines.length).toEqual(2)

    // line 1
    expect(lines[0]).toEqual("elep");

    // line 2
    expect(lines[1]).toEqual("hant");
  }));
});
