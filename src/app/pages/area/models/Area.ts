import { User } from './../../../auth/models/User';

export class Area {
    id: string;
    name: string;
    description: string;
    manager_id: User;
    cordinator_id: User;
}