import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.component.html',
  styleUrls: ['./e404.component.scss']
})
export class E404Component implements OnInit {

  notFoundEmotes = [
    // '(^_^)b',
    // '(o^^)o',
    // '(·.·)',
    '\\(o_o)/',
    '(>_<)',
    '(;-;)',
    '(˚Δ˚)b',
    '(·_·)',
    '¯\\_(ツ)_/¯',
    'ヽ(•́o•̀)ノ',
    '(・_・ヾ',
    '(´･_･`)',
    '(°ヘ°)',
    '【・_・?】',
    '(◎_◎;)',
    '(⊙＿⊙\')',
    '(⊙⊙)(☉_☉)(⊙⊙)',
    '(._. )( ._.)',
  ];
  emote: string;
  constructor() { }

  ngOnInit(): void {
    this.emote = this.notFoundEmotes[Math.floor(Math.random() * 14)];
  }


}
