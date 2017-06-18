import {Collection} from 'backbone';
import Person from '../models/Person';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const Data = Collection.extend({
    model: Person,
    url: '/front-end/api.php'//?region=euw1&summoner=NoDayMercy'//ajaxRequest('./api.php')//.then(showJson)
});
// console.log(ajaxRequest('./api.php'));
export default Data;