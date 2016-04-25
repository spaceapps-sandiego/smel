/**
 * @author jjacobson93
 * @date 4/24/2016
 */

class EventType {
    constructor(key, text) {
        this.key = key;
        this.text = text;
    }

    static from(key) {
        for (var value in EventType) {
            let type = EventType[value];
            if (type.key === key) {
                return type;
            }
        }

        return EventType.Unknown;
    }
}

EventType.Unknown = new EventType('unknown', 'Unknown');
EventType.Flood = new EventType('flood', 'Flood');
EventType.Earthquake = new EventType('earthquake', 'Earthquake');
EventType.Landslide = new EventType('landslide', 'Landslide');
EventType.SevereStorm = new EventType('severestorm', 'Severe Storm');
EventType.Volcano = new EventType('volcano', 'Volcano');
EventType.Fire = new EventType('fire', 'Fire');

export default EventType;