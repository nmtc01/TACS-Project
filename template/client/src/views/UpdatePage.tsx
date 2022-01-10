import InsertNewOrUpdate from "../components/InsertNewOrUpdate";
import { Resource } from '../types';
import { useParams } from "react-router";

export default function UpdateNewPage(resource: Resource) {
  const params: any = useParams();
  return (
    <InsertNewOrUpdate type="update" resource={resource} _id={params.id} />
  );
}
