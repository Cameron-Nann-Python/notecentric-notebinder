import { useParams } from "react-router-dom";

function ForumClass() {
    const { classId } = useParams();

    return (
        <div>
            Selected Class: {classId}
        </div>
    )
}

export default ForumClass;