import { browser, element, by } from 'protractor';

export class Angularattack2017FunPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fun-root h1')).getText();
  }
}
