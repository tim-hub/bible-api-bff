import {BibleGatewayAPI} from '../provider/bibleGateway';

// test BibleGatewayAPI through jest
describe('BibleGatewayAPI', () => {
  it('should be defined', () => {
    expect(new BibleGatewayAPI()).toBeDefined();
  });
});
