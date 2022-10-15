/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface UserProps {
    userLastname: string;
    userFirstname: string;
    userPhone: string;
}

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

function PhoneBookForm({ addEntryToPhoneBook }) {
    const [formData, setFormData] = useState({
        userFirstname: "Coder",
        userLastname: "Byte",
        userPhone: "8885559999",
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                addEntryToPhoneBook(formData);
            }}
            style={style.form.container}
        >
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                onChange={handleChange}
                type='text'
                value={formData.userFirstname}
                required
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                onChange={handleChange}
                type='text'
                value={formData.userLastname}
                required
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                onChange={handleChange}
                type='text'
                value={formData.userPhone}
                required
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

interface InformationTableProps {
    users: UserProps[];
}

function InformationTable({ users }: InformationTableProps) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {users?.map(({ userFirstname, userLastname, userPhone }) => {
                    return (
                        <tr>
                            <th style={style.tableCell}>{userFirstname}</th>
                            <th style={style.tableCell}>{userLastname}</th>
                            <th style={style.tableCell}>{userPhone}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

function Application(props) {
    const [users, setUsers] = useState<UserProps[]>([]);

    const addEntryToPhoneBook = (detail: UserProps) => {
        setUsers((prevData: UserProps[]) => {
            // binary search for maintaining sorted array on insert
            return [...prevData, detail].sort(sort);
        });
    };
    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
            <InformationTable users={users} />
        </section>
    );
}

function sort(elementA, elementB) {
    return elementA.userLastname.localeCompare(elementB.userLastname);
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);