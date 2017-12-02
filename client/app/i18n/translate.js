import React from 'react';
import en from './en';
import pl from './pl';

const languages = {
    en,
    pl
};

/**
 *
 * @param namespace
 * @returns {function(*)}
 */
export default function translate(namespace) {
    return Component => {
        class TranslationComponent extends React.Component {
            render() {
                const currentLanguage = this.context.currentLanguage || 'pl';
                const strings = languages[currentLanguage][namespace];

                if (strings) {
                    return <Component {...this.props} {...this.state} strings={strings} />;
                } else {
                    return <Component {...this.props} {...this.state} />;
                }
            }
        }

        TranslationComponent.contextTypes = {
            currentLanguage: React.PropTypes.string
        };

        return TranslationComponent;
    };
}