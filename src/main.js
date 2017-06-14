// import createDomElement from './domElement';
// import ajaxRequest from './ajaxRequest';
//
//
// let userName = 'NoDayMercy';
//
// // console.log('test1');
// // ajaxRequest('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+userName+'?api_key='+api_key).then(showJson);
// var showJson = (data) => {
//   console.log(data);
//   // var json = JSON.parse(data);
//   // console.log(json.name);
//   // console.log(json.accountId);
//
// }
// // ajaxRequest('./api.php').then(showJson);
//
//
// // console.log('test4');
//
//
// let p = createDomElement({
//   tagName: 'p',
//   attributes: {
//     class: 'introduction'
//   },
//   content: 'My new paragraph'
// });
//
//
// let placeholder = document.getElementById('container');
// placeholder.appendChild(p);

import _ from 'underscore';
import {Events} from 'backbone';
import Data from './collections/Data';
import Summoner from './views/Summoner';
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
        // console.log(dataCollection);
        // dataCollection.fetch({success:function(data,more,three){
        //   console.log(data);
        //   console.log(more);
        //   console.log(three);
        // }})
        // new TeamLinks({el: "#team-links"});
        new Summoner({el: "#summoner", collection: dataCollection});
        App.events.trigger('newSummoner');
        Backbone.history.start({pushState: true, root: '/front-end/'});
    };

    window.addEventListener('load', init);
})();
