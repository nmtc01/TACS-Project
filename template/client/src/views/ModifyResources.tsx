import { useEffect, useState } from 'react';
import API from '../api/API';

export default function ModifyResources() {

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

    API.postMethod(
      (res: any) => { console.log(res) },
      'modify-resources',
      {
        resources: dummyModifiedResources
      },
      (err: any) => { console.error(err) });
  })

  return (
    <>
      Modify resources page. TODO (Nuno)
    </>
  );
}
