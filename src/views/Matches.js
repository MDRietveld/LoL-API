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

  initialize: function ()
  {
    //Set templates to use later on
    this.templateMatches = _.template(this.$('#template-matches').html());
    this.templateError = _.template(this.$('#template-error').html());
    //Listen to global events for change of new club
    App.events.on('getMatches', this.loadMatches, this);
  },

  /**
  * Wrapper function to load the matches through the collection
  *
  * @param data
  */
  loadMatches: function (data){
    this.collection.fetch({
      success: (collection, more) => this.loadMatchesSuccessHandler(collection, more),
      error: (collection, response) => this.loadMatchesErrorHandler(collection, response),
      data: {
          id: data.id,
          region: data.region
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

export default Matches;
