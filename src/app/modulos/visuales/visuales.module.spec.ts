import { VisualesModule } from './visuales.module';

describe('VisualesModule', () => {
  let visualesModule: VisualesModule;

  beforeEach(() => {
    visualesModule = new VisualesModule();
  });

  it('should create an instance', () => {
    expect(visualesModule).toBeTruthy();
  });
});
