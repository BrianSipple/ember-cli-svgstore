import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    return this.get('ajax')
      .request('/assets/test-icons.svg', { dataType: 'text' })
      .then(svg => ({ svg }));
  }
});
