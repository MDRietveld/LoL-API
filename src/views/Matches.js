import {View} from 'backbone';
import _ from 'underscore';
// import SummonerRoute from '../routers/SummonerRoute';

/**
* Object representing the Matches element
*
* @constructor
*/
const Matches = View.extend({
  templateMatches: '',
  templateError: '',
  region: '',

  events: {
    'click .match': 'showMatch'
  },

  initialize: function ()
  {
    //Set templates to use later on
    this.templateMatches = _.template(this.$('#template-matches').html());
    this.templateError = _.template(this.$('#template-error').html());
    //Listen to global events for change of the summoner which loads new matches
    App.events.on('getMatches', this.loadMatches, this);
  },

  showMatch: function (e) {
    App.events.trigger('getMatchDetails', {
      gameId: e.currentTarget.dataset['gameid'],
      region: this.region
    });
  },

  /**
  * Wrapper function to load the matches through the collection
  *
  * @param data
  */
  loadMatches: function (data){
    this.region = data.region;
    this.collection.fetch({
      success: (collection, more) => this.loadMatchesSuccessHandler(collection, more),
      error: (collection, response) => this.loadMatchesErrorHandler(collection, response),
      data: {
          id: data.id,
          region: data.region,
          beginIndex: data.beginIndex,
          endIndex: data.endIndex
      }
    });
  },

  /**
  * Success Handler will add HTML of matches to this $el
  *
  * @param collection
  */
  loadMatchesSuccessHandler: function (collection, more){
    this.$el.html(this.templateMatches({matches: more.matches}));
  },

  /**
  * On error, log the response (json error didn't work)
  *
  * @param collection
  * @param response
  */
  loadMatchesErrorHandler: function (collection, response){
    console.log(collection);
    console.log(response);
  }
});

export default Matches;
