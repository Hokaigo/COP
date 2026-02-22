import Cell from './Cell.jsx';
import '../../index.css';

export default {
    title: 'Game/Cell',
    component: Cell,
    argTypes: {
        value: { control: { type: 'number', min: 1, max: 9 }, description: 'Значення в клітинці' },
        isFixed: { control: 'boolean', description: 'Чи є клітинка початковою' },
        isSelected: { control: 'boolean', description: 'Чи вибрана клітинка (показує інпут)' },
        isFocused: { control: 'boolean', description: 'Чи підсвічена лінія/блок' },
        isSame: { control: 'boolean', description: 'Чи таке ж число, як у вибраної' },
        isLineOrBlock: { control: 'boolean', description: 'Підсвітка лінії або квадрата' },
        onSelect: { action: 'onSelect' },
        onChange: { action: 'onChange' },
        onBlur: { action: 'onBlur' },
    },
    args: {
        row: 0,
        col: 0,
    }
};

export const Empty = {
    args: { value: null, isFixed: false, isSelected: false }
};

export const ActiveInput = {
    args: { value: null, isFixed: false, isSelected: true }
};

export const StartingFixed = {
    args: { value: 9, isFixed: true, isSelected: false }
};