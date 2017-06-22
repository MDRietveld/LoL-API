import {View} from 'backbone';
import _ from 'underscore';

/**
* Object representing the Summoner element
*
* @constructor
*/
const Summoner = View.extend({
  templateSummoner: '',
  templateError: '',
  region: '',
  beginIndex: 0,
  endIndex: 10,

  initialize: function ()
  {
    //Set templates to use later on
    this.templateSummoner = _.template(this.$('#template-summoner').html());
    this.templateError = _.template(this.$('#template-error').html());
    //Listen to global events for change of the summoner
    App.events.on('newSummoner', this.loadSummoner, this);
  },

  /**
  * Wrapper function to load the summoner through the collection
  *
  * @param data
  */
  loadSummoner: function (data){
    this.region = data.region;
    this.collection.fetch({
      success: (collection, more) => this.loadSummonerSuccessHandler(collection, more),
      error: (collection, response) => this.loadSummonerErrorHandler(collection, response),
      data: {
          region: data.region,
          summoner: data.summoner
      }
    });
  },

  /**
  * Success Handler will add HTML of the summoner to this $el
  *
  * @param collection
  * @param more
  */
  loadSummonerSuccessHandler: function (collection, more){
    this.$el.html(this.templateSummoner({summoner: collection.models}));
    App.events.trigger('getMatches', {
      id: more.accountId,
      region: this.region,
      beginIndex: this.beginIndex,
      endIndex: this.endIndex
    });
  },

  /**
  * On error, log the response (json error didn't work)
  *
  * @param collection
  * @param response
  */
  loadSummonerErrorHandler: function (collection, response){
    console.log(collection);
    console.log(response);
  }
});

export default Summoner;
