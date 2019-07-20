( function( blocks, element ) {
    var el = element.createElement;
 
    blocks.registerBlockType( 'widgets/clock', {
        title: 'Uhrzeit',
        icon: 'clock',
        category: 'widgets',
        attributes: {
            className: {
                source: 'attribute',
                type: 'string',
                attribute: 'class'
            }
        },
        edit: function(props) {
            return el(
                'div',
                { className: props.className, 'data-view': 'clock' },
                '12:00'
            );
        },
        save: function(props) {
            return el(
                'div',
                { className: props.attributes.className, 'data-view': 'clock' },
                ''
            );
        },
    } );

    blocks.registerBlockType( 'widgets/calendar', {
        title: 'Datum',
        icon: 'calendar',
        category: 'widgets',
        attributes: {
            className: {
                source: 'attribute',
                type: 'string',
                attribute: 'class'
            }
        },
        edit: function(props) {
            return el(
                'div',
                { className: props.className, 'data-view': 'calendar' },
                'Monday, 01.01.2019'
            );
        },
        save: function(props) {
            return el(
                'div',
                { className: props.attributes.className, 'data-view': 'calendar' },
                ''
            );
        },
    } );
}(
    window.wp.blocks,
    window.wp.element
) );