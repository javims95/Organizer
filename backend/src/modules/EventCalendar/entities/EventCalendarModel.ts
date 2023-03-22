import mongoose, { Document } from "mongoose";

const EventCalendarSchema = new mongoose.Schema<IEventCalendar>(
    {
        title: {
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: false,
        },
        allDay: {
            type: Boolean,
            required: false,
        },
        backgroundColor: {
            type: String,
            required: true,
        },
        textColor: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        collection: "EventCalendar",
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
);

export interface IEventCalendar extends Document {
    title: string;
    start: Date;
    end: Date;
    allDay: Boolean;
    backgroundColor: string;
    textColor: string;
    createdAt: Date;
    updatedAt: Date;
}

const EventCalendarModel = mongoose.model(
    "EventCalendar",
    EventCalendarSchema
);

export default EventCalendarModel;
