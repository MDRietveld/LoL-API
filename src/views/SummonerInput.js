import {View} from 'backbone';
import SummonerRoute from '../routers/SummonerRoute';

/**
* Object representing the SummonerInput element
*
* @constructor
*/
const SummonerInput = View.extend({
  router: null,

  events: {
    'click .search-summoner': 'clickHandler',
    'keyup .typed-summoner': 'logKey'
  },

  initialize: function ()
  {
    //Initialize the matches router to activate navigation
    this.router = new SummonerRoute();
  },

  /**
  * logKey for keyup, check wether enter is selected to go to clickHandler 
  *
  * @param e
  */
  logKey: function (e)
  {
    if(e.keyCode == 13){
      this.clickHandler();
    }

  },

  /**
  * Click handler for links, retrieve data attributes and navigate router
  *
  * @param e
  */
  clickHandler: function (e)
  {
    let summoner = this.$('.typed-summoner').val();
    let region = this.$('.region option:selected').val();
    let url = '/summoner/'+region+'/'+summoner+'';

    //Use trigger & replace to update URL and make the router listen to change
    this.router.navigate(url, {trigger: true, replace: true});
  }
});

export default SummonerInput;
