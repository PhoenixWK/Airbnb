
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function ImageInput() {
    const name = 'image';

    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">
                Image
            </Label>
            <Input
                type="file"
                name={name}
                id={name}
                required={true}
                accept={'image/*'}
                className="max-w-xs"
            />
        </div>
    )
}