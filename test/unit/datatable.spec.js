import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

class MockRepository {
  find = () => {
    return Promise.resolve([{id: 1, data: 'mocked-data'}]);
  }
  count = () => {
    return Promise.resolve({count: 1});
  }
}

describe('the Datatable component', () => {
  let config     = {repository: new MockRepository};
  let component;

  // setup component for each test
  beforeEach(() => {
    component = StageComponent
      .withResources('src/datatable')
      .inView('<datatable repository.bind="repository" columns="id, data as name"></datatable>')
      .boundTo(config);

    component.configure = aurelia => {
      aurelia.use.standardConfiguration()
        .feature('src');
    };
  });

  // destroy component after each test
  afterEach(() => {
    component.dispose();
  });

  it('can render the component', done => {
    component.create(bootstrap).then(() => {
      const pageElement = document.querySelector('datatable');

      expect(pageElement.getAttribute('au-target-id')).toBeDefined();
      expect(pageElement.innerHTML).toContain('mocked-data');

      pageElement.querySelector('.pagination');
      expect(pageElement.innerHTML).toBeDefined();
    }).then(done)
    .catch(e => {
      console.error(e.message, e.stack);
      done();
    });
  });
});
