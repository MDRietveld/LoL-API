import _ from 'underscore';
import {Events} from 'backbone';
import Data from './collections/Data';
import Summoner from './views/Summoner';
import SummonerInput from './views/SummonerInput';
import Matches from './views/Matches';
import MatchDetails from './views/MatchDetails';
// import TeamLinks from './views/TeamLinks';
// import TeamMatches from './views/TeamMatches';

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();

        let dataCollection = new Data();
        let matchesCollection = new Data();
        let matchesDetailsCollection = new Data();

        new SummonerInput({el: "#summoner-input"});
        new Summoner({el: "#summoner", collection: dataCollection});
        new Matches({el: "#matches", collection: matchesCollection});
        new MatchDetails({el: "#match-details", collection: matchesDetailsCollection});
        // App.events.trigger('newSummoner', {region:'euw1', summoner:'NoDayMercy'});
        Backbone.history.start({pushState: true, root: '/front-end/'});
    };

    window.addEventListener('load', init);
})();
