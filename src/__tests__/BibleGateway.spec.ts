import {BibleGatewayAPI} from '../provider/BibleGateway';

// test BibleGatewayAPI through jest
describe('BibleGatewayAPI', () => {
  it('should be defined', () => {
    expect(new BibleGatewayAPI()).toBeDefined();
  });
});
