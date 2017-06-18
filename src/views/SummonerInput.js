import {View} from 'backbone';
import SummonerRoute from '../routers/SummonerRoute';

/**
* Object representing the TeamLinks element
*
* @constructor
*/
const SummonerInput = View.extend({
  router: null,

  events: {
    'click .search-summoner': 'clickHandler'
  },

  initialize: function ()
  {
    //Initialize the matches router to activate navigation
    this.router = new SummonerRoute();
  },

  /**
  * Click handler for links, retrieve data attributes and navigate router
  *
  * @param e
  */
  clickHandler: function (e)
  {
    e.preventDefault();

    //Get target the retrieve data properties
    let target = e.currentTarget;
    let summoner = this.$('.typed-summoner').val();
    let region = this.$('.region option:selected').val();
    // let url = '/front-end/api.php?region=' + target.dataset['region'] + '&summoner=' + target.dataset['summoner'] + '';
    let url = '/summoner/'+region+'/'+summoner+'';
    // let url = 'summoner/' + target.dataset['region'] + '/' + target.dataset['summoner'];

    //Use trigger & replace to update URL and make the router listen to change
    this.router.navigate(url, {trigger: true, replace: true});
  }
});

export default SummonerInput;