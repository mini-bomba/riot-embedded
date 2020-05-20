import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import EventTile from './event-tile.jsx';
import ThemeContext from './theme-context.jsx';

/**
 * React component for the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} room - The room object
 * @param   {object} children - Children of room timeline
 */
export default class TimelinePanel extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        room: PropTypes.object, // Room object
        children: PropTypes.object // Children of the room body
    };

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Construct timeline from room
        let timeline = [];
        if (this.props.room) {
            for (let event of this.props.room.timeline) {
                timeline.push(
                    <EventTile key={event.event.event_id} 
                        homeserver={this.props.homeserver}
                        mxEvent={event} />
                ); 
            }
        }
        
        return (
            <div className='main-body'>
                <div className={
                    `bg-primary-${theme.theme} body-panel scrollable-${theme.theme}`
                }>
                    <ul className='list-panel'>
                        {timeline}
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}