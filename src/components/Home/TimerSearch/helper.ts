import {SlotWithId, TimeLineType} from "../../../types";
import {formatDate} from "../../../helpers/date";

export const TYPE_DESCRIPTION_MAP = {
    [TimeLineType.START_TIMER] : {
        heading: "Start",
        description: "Timer started",
    },
    [TimeLineType.NO_RECORDS] : {
        heading: "No appointment found",
        description: "No closest date available",
    },
    [TimeLineType.NO_RECORDS_WITH_CLOSEST] : {
        heading: "No appointment found",
        description: "Closest date available on {{time}} at {{desk}}",
    },
    [TimeLineType.ERROR] : {
        heading: "Error",
        description: "Some unknown error occurred. Will retry.",
    },
    [TimeLineType.UNKNOWN] : {
        heading: "Unknown status",
        description: "Do not worry, we are trying again",
    },
    [TimeLineType.ERROR] : {
        heading: "Error",
        description: "Some unknown error occurred. Will retry.",
    },
    [TimeLineType.SIMILAR_APT_EXISTS]:{
        heading: "Appointment exist",
        description: "Appointment exist with this email id. Schedule will be stopped"
    },
    [TimeLineType.MANY_FAILURES]:{
        heading: "Multiple failures",
        description: "The IND endpoint failed more than 10 times"
    }
}



export const getTimeLineHeadingAndDescription = (type: TimeLineType, closestSlot?: SlotWithId) => {
    if(type === TimeLineType.NO_RECORDS_WITH_CLOSEST){
        return {
            heading: TYPE_DESCRIPTION_MAP[type].heading,
            description: TYPE_DESCRIPTION_MAP[type].description.replace("{{time}}", formatDate(closestSlot?.date as string)).replace("{{desk}}", closestSlot?.deskName as string)
        }
    }

    return TYPE_DESCRIPTION_MAP[type];
}