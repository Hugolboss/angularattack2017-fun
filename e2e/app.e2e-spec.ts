import { Angularattack2017FunPage } from './app.po';

describe('angularattack2017-fun App', () => {
  let page: Angularattack2017FunPage;

  beforeEach(() => {
    page = new Angularattack2017FunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fun works!');
  });
});
