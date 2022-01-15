import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';

export default function ModifyResources() {

  const history = useHistory();

  useEffect(() => {
    const dummyModifiedResources = [
      {
        "name": "client",
        "attributes": [
          {
            "name": "id",
            "type": "number",
            "required": false
          },
          {
            "name": "name",
            "type": "text"
          },
          {
            "name": "address",
            "type": "text"
          },
          {
            "name": "car",
            "references": "car"
          },
          {
            "name": "age",
            "type": "number"
          }
        ]
      },
      {
        "name": "car",
        "attributes": [
          {
            "name": "id",
            "type": "number",
            "required": false
          },
          {
            "name": "license_plate",
            "type": "text"
          },
          {
            "name": "is_new",
            "type": "bool"
          }
        ]
      },
      {
        "name": "motorcycle",
        "attributes": [
          {
            "name": "cc",
            "type": "number"
          },
          {
            "name": "is_old",
            "type": "bool"
          }
        ]
      }
    ];

    const ping = () => {
      API.getMethod(() => {
        history.push('/');
      },
        "ping",
        (_: any) => {
          setTimeout(() => {
            ping();
          }, 500);
        });
    }

    API.postMethod(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          ping()
        }, 1000);
      },
      'modify-resources',
      {
        resources: dummyModifiedResources
      },
      (err: any) => { console.error(err); });
  })

  return (
    <>
      Modify resources page. TODO (Nuno)
    </>
  );
}
