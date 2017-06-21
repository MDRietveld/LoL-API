import {View} from 'backbone';
import _ from 'underscore';
// import SummonerRoute from '../routers/SummonerRoute';

/**
* Object representing the MatchDetails element
*
* @constructor
*/
const MatchDetails = View.extend({
  templateMatches: '',
  templateError: '',



  initialize: function ()
  {
    //Set templates to use later on
    this.templateMatches = _.template(this.$('#template-match-details').html());
    this.templateError = _.template(this.$('#template-error').html());
    //Listen to global events for change of new club
    App.events.on('getMatchDetails', this.matchDetails, this);
  },

  /**
  * Wrapper function to load the match details through the collection
  *
  * @param data
  */
  matchDetails: function (data){
    this.collection.fetch({
      success: (collection, more) => this.loadMatchesSuccessHandler(collection, more),
      error: (collection, response) => this.loadMatchesErrorHandler(collection, response),
      data: {
          matchId: data.gameId,
          region: data.region
      }
    });
  },

  /**
  * Success Handler will add HTML of matches to this $el
  *
  * @param collection
  * @param more
  */
  loadMatchesSuccessHandler: function (collection, more){
    // console.log(collection);
    // console.log(more);
    this.$el.html(this.templateMatches({matchdetails: collection.models}));
  },

  /**
  * On error, show error message in this $el
  *
  * @param collection
  * @param response
  */
  loadMatchesErrorHandler: function (collection, response){
    // this.$el.html(this.templateError({message: response.responseJSON.error}));
    console.log(collection);
    console.log(response);
  }
});

export default MatchDetails;
