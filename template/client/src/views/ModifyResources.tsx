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
            "type": "number"
          },
          {
            "name": "name",
            "type": "text", 
            "required": true
          },
          {
            "name": "address",
            "type": "text" 
          },
          {
            "name": "car",
            "references": "car"
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
            "type": "text",
            "required": true
          },
          {
            "name": "is_new",
            "type": "bool" 
          },
          {
            "name": "is_old",
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
