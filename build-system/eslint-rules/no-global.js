/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
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

var astUtils = require('eslint/lib/ast-utils');

var GLOBALS = Object.create(null);
GLOBALS.window = true;

module.exports = function(context) {
  return {
    Identifier: function(node) {
      if (!GLOBALS[node.name]) {
        return;
      }

      if (node.parent.type === 'MemberExpression' &&
          node.parent.property === node) {
        return;
      }

      var variable = astUtils.getVariableByName(context.getScope(), node.name);
      if (variable.defs.length > 0) {
        return;
      }

      var message = 'Forbidden global `' + node.name + '`.';
      if (node.name === 'window') {
        message += ' Use `self` instead.';
      }
      context.report(node, message);
    }
  };
};
