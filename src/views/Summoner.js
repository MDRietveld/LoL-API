import {View} from 'backbone';
import _ from 'underscore';

/**
* Object representing the TeamLinks element
*
* @constructor
*/
const Summoner = View.extend({
  templateSummoner: '',
  templateError: '',

  initialize: function ()
  {
    //Set templates to use later on
    this.templateSummoner = _.template(this.$('#template-summoner').html());
    this.templateError = _.template(this.$('#template-error').html());
    //Listen to global events for change of new club
    App.events.on('newSummoner', this.loadSummoner, this);
    // this.loadSummoner(this);
  },

  /**
  * Wrapper function to load the matches through the collection
  *
  * @param data
  */
  loadSummoner: function (data){
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
  * Success Handler will add HTML of matches to this $el
  *
  * @param collection
  */
  loadSummonerSuccessHandler: function (collection, more){
    this.$el.html(this.templateSummoner({summoner: collection.models}));
  },

  /**
  * On error, show error message in this $el
  *
  * @param collection
  * @param response
  */
  loadSummonerErrorHandler: function (collection, response){
    // this.$el.html(this.templateError({message: response.responseJSON.error}));
    console.log(collection);
    console.log(response);
  }
});

export default Summoner;
