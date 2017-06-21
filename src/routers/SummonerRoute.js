import {Router} from 'backbone';

/**
* Router for the matches URL's
*
* @constructor
*/
const SummonerRoute = Router.extend({
  routes: {
    'summoner/:region/:summoner': 'loadSummoner'
  },

  /**
  * Route callback, used to trigger global event
  *
  * @param region
  * @param summoner
  */
  loadSummoner: function (region, summoner)
  {
    App.events.trigger('newSummoner', {
      region: region,
      summoner: summoner
    });
  }
});

export default SummonerRoute;
