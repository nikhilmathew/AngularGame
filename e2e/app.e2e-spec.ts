import { AngularGamePage } from './app.po';

describe('angular-game App', () => {
  let page: AngularGamePage;

  beforeEach(() => {
    page = new AngularGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
