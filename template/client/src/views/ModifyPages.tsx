import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api/API';

export default function ModifyPages() {

  const history = useHistory();

  useEffect(() => {
    const dummyModifiedPages = [
      {
        "method": "Get-all",
        "resource": "client"
      },
      {
        "method": "Get-all",
        "resource": "car"
      },
      {
        "method": "Get-all",
        "resource": "motorcycle"
      },
      {
        "method": "Get-one",
        "resource": "client"
      },
      {
        "method": "Delete",
        "resource": "client"
      },
      {
        "method": "Add",
        "resource": "motorcycle"
      },
      {
        "method": "Add",
        "resource": "car"
      },
      {
        "method": "Update",
        "resource": "client"
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
      'modify-pages',
      {
        pages: dummyModifiedPages
      },
      (err: any) => { console.error(err); });
  })

  return (
    <>
      Modify pages page. TODO (Nuno)
    </>
  );
}
