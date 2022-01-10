import InsertNewOrUpdate from "../components/InsertNewOrUpdate";
import { Resource } from '../types';

export default function InsertNewPage(resource: Resource) {
    return (
        <InsertNewOrUpdate type="insert" resource={resource} />
    );
}
