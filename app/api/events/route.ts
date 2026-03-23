import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import { v2 as cloudinary } from 'cloudinary';

function parseArray(value: FormDataEntryValue | null): string[] {
    if (!value) return [];

    if (typeof value === "string") {
        try {
            return JSON.parse(value); // handles ["Cloud","AI"]
        } catch {
            // fallback: comma separated
            return value.split(",").map(v => v.trim()).filter(Boolean);
        }
    }

    return [];
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();

        let event: any;

        try {
            event = Object.fromEntries(formData.entries());

            // convert strings -> arrays
            event.agenda = parseArray(formData.get("agenda"));
            event.tags = parseArray(formData.get("tags"));

        } catch (e) {
            return NextResponse.json({ message: 'Invalid JSON data format' }, { status: 400 })
        }

        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({ message: 'Image file is required' }, { status: 400 })

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if (error) return reject(error);

                resolve(results);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 })

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown' })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAT: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 })

    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 })
    }
}