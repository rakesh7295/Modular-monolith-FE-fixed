import React, { useEffect, useState } from 'react';
import {
    useHistory
} from "react-router-dom";
import { HttpClient } from '../../shared/http-client';

interface MeetingGroup {
    id: string,
    name: string,
    description: string,
    locationCity: string,
    locationCountryCode: string,
    roleCode: string
}

export function AllMeetingGrups() {

    const [meetingGroups, setMeetingGroups] = useState<Array<MeetingGroup>>([]);

    useEffect(() => {
        loadMeetingGroups();
    }, []);

    let history = useHistory();

    function loadMeetingGroups() {
        HttpClient.get<Array<MeetingGroup>>('api/meetings/meetingGroups/all')
            .then(response => setMeetingGroups(response));
    }

    function onClick(meetingGroupId: string) {
        history.push(`/meeting-groups/${meetingGroupId}`);
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Role</th>
                </thead>

                {meetingGroups.map(item =>
                    <tbody>
                        <td>{item.name} </td>
                        <td>{item.description} </td>
                        <td>{item.locationCity} </td>
                        <td>{item.locationCountryCode} </td>
                        <td>{item.roleCode} </td>
                        <td><button onClick={() => onClick(item.id)}>Go to group</button></td>
                    </tbody>
                )}

            </table>
        </div>
    )
}