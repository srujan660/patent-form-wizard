
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HelpTooltip from './HelpTooltip';
import { Plus, Trash } from 'lucide-react';

export interface Inventor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface InventorFieldsProps {
  inventors: Inventor[];
  onAddInventor: () => void;
  onRemoveInventor: (id: string) => void;
  onInventorChange: (id: string, field: keyof Inventor, value: string) => void;
}

const InventorFields: React.FC<InventorFieldsProps> = ({
  inventors,
  onAddInventor,
  onRemoveInventor,
  onInventorChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Inventors</h3>
          <HelpTooltip content="Add all inventors who contributed to this invention. The first inventor listed will be designated as the primary inventor." />
        </div>
        <Button 
          onClick={onAddInventor} 
          type="button" 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Inventor
        </Button>
      </div>

      {inventors.map((inventor, index) => (
        <div 
          key={inventor.id} 
          className="p-4 border rounded-lg animate-fade-in space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              {index === 0 ? 'Primary Inventor' : `Inventor ${index + 1}`}
            </h4>
            {index > 0 && (
              <Button
                onClick={() => onRemoveInventor(inventor.id)}
                variant="ghost"
                size="sm"
                className="text-destructive"
              >
                <Trash className="h-4 w-4 mr-1" /> Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`inventor-${inventor.id}-firstName`}>First Name <span className="text-destructive">*</span></Label>
              <Input
                id={`inventor-${inventor.id}-firstName`}
                value={inventor.firstName}
                onChange={(e) => onInventorChange(inventor.id, 'firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={`inventor-${inventor.id}-lastName`}>Last Name <span className="text-destructive">*</span></Label>
              <Input
                id={`inventor-${inventor.id}-lastName`}
                value={inventor.lastName}
                onChange={(e) => onInventorChange(inventor.id, 'lastName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={`inventor-${inventor.id}-email`}>Email <span className="text-destructive">*</span></Label>
              <Input
                id={`inventor-${inventor.id}-email`}
                type="email"
                value={inventor.email}
                onChange={(e) => onInventorChange(inventor.id, 'email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={`inventor-${inventor.id}-address`}>Address <span className="text-destructive">*</span></Label>
              <Input
                id={`inventor-${inventor.id}-address`}
                value={inventor.address}
                onChange={(e) => onInventorChange(inventor.id, 'address', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventorFields;
