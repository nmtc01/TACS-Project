import { CDataTable, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import API from '../api/API';
import { Resource } from '../types';
import { useHistory } from 'react-router-dom';

export default function GetAllPage(resource: Resource) {
    const history = useHistory();
    const [errors, setErrors] = useState(<></>);
    const [resourcesList, setResourcesList] = useState([]);
    const [hasAddBtn, setHasAddBtn] = useState(false);
    const [hasGetOneBtn, setHasGetOneBtn] = useState(false);

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

        API.getMethod(setResourcesList, resource.name, handleErrors);
        API.getMethod(setHasGetOneBtn, 'hasGetone?resource=' + resource.name, handleErrors);
        API.getMethod(setHasAddBtn, 'hasAdd?resource=' + resource.name, handleErrors);
    }, [resource.name]);

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
                onRowClick={(item: any) => 
                    history.push(`/${resource.name}/${item._id}`)
                }
                scopedSlots={{
                    _id: (item: any) => (
                        <td>
                            {item._id}
                        </td>
                    ),
                    show_details: () => {
                        return (
                            <td className="py-2">
                                {hasGetOneBtn && (
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                    >
                                        Show
                                    </CButton>
                                )}
                            </td>
                        );
                    },
                }}
            />
            {hasAddBtn && (
                <CButton
                    color="primary"
                    onClick={() => history.push('/' + resource.name + '/new')}
                >
                    Add
                </CButton>
            )}
        </div>
    );
}
