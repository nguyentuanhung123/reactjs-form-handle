import React from "react"
const StudentList = (props) => {
    const { students } = props;
    return (
        <>
            <table id="students">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Occupation</th>
                        <th>Gender</th>
                        <th>Languages</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students &&
                        students.map((student, index) => {
                            return (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.username}</td>
                                    <td>{student.email}</td>
                                    <td>{student.occupation}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.languages}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default StudentList;