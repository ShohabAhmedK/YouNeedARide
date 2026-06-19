import React from 'react';
import { Input } from '../../../components/Input';

interface PickupNotesInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const PickupNotesInput: React.FC<PickupNotesInputProps> = ({ value, onChangeText }) => (
  <Input
    label="Pickup Notes"
    placeholder="Gate code, landmark, building..."
    leftIcon="note"
    value={value}
    onChangeText={onChangeText}
  />
);
