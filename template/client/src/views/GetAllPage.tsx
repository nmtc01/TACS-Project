import { CDataTable, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';

interface Resource {
    name: string;
}

export default function GetAllPage(resource: Resource) {
    const [errors, setErrors] = useState(<></>);
    const [resourcesList, setResourcesList] = useState([]);

    useEffect(() => {
        const handleErrors = (err: any) => {
            setErrors(
                <div className="alert alert-danger">
                    <ul className="my-0">
                    {err.response.data.errors.map((err: any) => (
                        <li key={err.message}>{err.message}</li>
                    ))}
                    </ul>
                </div>
            );
        }

        API.getMethod(setResourcesList, resource.name, handleErrors)
    }, [resource]);

    const fields = [
        { key: '_id', label: 'ID', _style: { width: '30%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          sorter: false,
          filter: false,
        },
    ];

    return (
        <div>
            {errors}
            <CDataTable
                items={resourcesList}
                fields={fields}
                tableFilter
                itemsPerPageSelect
                itemsPerPage={10}
                hover
                sorter
                pagination
                scopedSlots={{
                    _id: (item: any) => (
                        <td>
                            {item._id}
                        </td>
                    ),
                    show_details: () => {
                        return (
                            <td className="py-2">
                                <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                >
                                    Show
                                </CButton>
                            </td>
                        );
                    },
                }}
            />
        </div>
    );
}
