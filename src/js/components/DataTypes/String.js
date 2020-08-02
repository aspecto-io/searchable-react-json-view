import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import { toType } from './../../helpers/util';
import splitAndPushByDelimiter from './../../helpers/splitAndPushByDelimiter';

//theme
import Theme from './../../themes/getStyle';

//attribute store for storing collapsed state
import AttributeStore from './../../stores/ObjectAttributes';

export default class extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: AttributeStore.get(
                props.rjvId,
                props.namespace,
                'collapsed',
                true
            )
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        }, () => {
            AttributeStore.set(
                this.props.rjvId,
                this.props.namespace,
                'collapsed',
                this.state.collapsed
            );
        });
    }

    render() {
        const type_name = 'string';
        const { props } = this;
        const { collapseStringsAfterLength, theme } = props;
        let { value } = props;
        let collapsible = toType(collapseStringsAfterLength) === 'integer';
        let style = { cursor: 'default' };

        if (props.highlightSearch && value.toLowerCase().includes(props.highlightSearch.toLowerCase())) {
            return <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                "{splitAndPushByDelimiter(value, props.highlightSearch).map((word, i) => [
                    <span
                        key={i}
                        class="string-value"
                        style={{backgroundColor: i%2 === 1 ? props.highlightSearchColor : 'transparent', ...style}}
                        onClick={this.toggleCollapsed}
                    >
                        {word}
                    </span>
                ])}"
            </div>
        }

        if (collapsible && value.length > collapseStringsAfterLength) {
            style.cursor = 'pointer';
            if (this.state.collapsed) {
                value = (
                    <span>
                        {value.substring(0, collapseStringsAfterLength)}
                        <span {...Theme(theme, 'ellipsis')}> ...</span>
                    </span>
                );
            }
        }

        return (
            <div {...Theme(theme, 'string')}>
                <DataTypeLabel type_name={type_name} {...props} />
                <span
                    class="string-value"
                    style={style}
                    onClick={this.toggleCollapsed}
                >
                    "{value}"
                </span>
            </div>
        );
    }
}
