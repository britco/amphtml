/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {loadScript} from '../3p/3p';

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function smartadserver(global, data) {
  loadScript(global, 'https://ec-ns.sascdn.com/diff/js/smart.js', () => {
    if (!global.document.getElementById(data.tag)) {
      const divElt = global.document.createElement('div');
      divElt.Id = data.tag;
      const cElt = global.document.getElementById('c');
      cElt.appendChild(divElt);
    }
    global.sas.cmd.push(function() {
      global.sas.setup({'domain': data.domain, 'async': true});
    });
    global.sas.cmd.push(function() {
      global.sas.call(data.call, {
        'siteId': data.site,
        'pageId': data.page,
        'formatId': data.format,
        'target': data.target,
        'tagId': data.tag,
      });
    });
  });
}
