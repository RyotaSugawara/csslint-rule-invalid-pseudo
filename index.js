var PSEUDO_TYPE = 'pseudo';

module.exports = {
	id: 'invalid-pseudo-elements',
	name: 'Disallow invalid pseudo-elements pattern',
	desc: 'Don\'t use multi pseudo-elements pattern.',
	url: 'https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements#Notes',
	browsers: 'All',
	init: function(parser, reporter) {
		'use strict';
		var rule = this;
		parser.addListener('startrule', function(event) {
			var selectors = event.selectors;
			var selector, part, modifier, hasPseudoElements, i, j, k;
			for (i = 0; i < selectors.length; i++) {
				selector = selectors[i];
				hasPseudoElements = false;
				for (j = 0; j < selector.parts.length; j++) {
					part = selector.parts[j];
					if (part.type === parser.SELECTOR_PART_TYPE) {
						for (k = 0; k < part.modifiers.length; k++) {
							modifier = part.modifiers[k];
							if (hasPseudoElements) {
								reporter.report('Don\'t use invalid pseudo-elements pattern.', part.line, part.col, rule);
							}
							if (isPseudoElements(modifier)) {
								hasPseudoElements = true;
							}
						}
					}
				}
			}
		});
		function isPseudoElements(modifier) {
			return (
				modifier.type === PSEUDO_TYPE && /after|before|first-letter|first-line|selection|backdrop/.test(modifier.text)
			);
		}
	}
};
