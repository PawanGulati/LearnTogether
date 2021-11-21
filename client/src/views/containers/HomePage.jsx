import React from 'react'

import StudentHomeRoutes from '../components/StudentHomeRoutes'
import MentorHomeRoutes from '../components/MentorHomeRoutes'

export default function HomePage(props) {
    const pathname = props.match.path;

    React.useEffect(() => {
        if(props.current_user['userType'] === 'student')
            props.set_cur_student()
        else
            props.set_cur_mentor()
    }, [])

    return (
        props.current_user['userType'] === 'student' ? 
        <StudentHomeRoutes {...props} /> : 
        <MentorHomeRoutes {...props} />
    )
}
